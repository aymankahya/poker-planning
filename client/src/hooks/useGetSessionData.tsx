import { useToast } from '@/components/ui/use-toast';
import useJoinSessionFromUrl from '@/hooks/useJoinSessionFromUrl';
import { Session } from '@/types';
import { getRoomIDFromUrl } from '@/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useGetSessionData() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const location = useLocation();
  const { joinSessionFromUrl } = useJoinSessionFromUrl();
  const user = JSON.parse(localStorage.getItem('user') ?? 'null');

  useEffect(() => {
    const getSessionData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/session-data?id=${getRoomIDFromUrl(location.pathname)}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        setDataLoading(false);
        navigate('/');
        return toast({
          variant: 'destructive',
          title: 'Uh oh ! Something went wrong',
          description:
            response.status === 404
              ? 'No session were found with the given ID. Check the session ID or create a new session'
              : response.status === 400
                ? 'Invalid session ID'
                : 'An error occured. Please try again',
        });
      }

      const data: Session = await response.json();
      // Handle accessing the session directly from URL
      if (!user) {
        window.location.href = '/';
      }
      if (
        data.players.some((player) => player.id === user?.id.toString()) ||
        data.guests.some((guest) => guest.id === user?.id.toString())
      ) {
        setSession({ ...data });
        setDataLoading(false);
      }
      if (user?.role === 'guest') {
        await joinSessionFromUrl({
          sessionId: getRoomIDFromUrl(location.pathname) ?? '',
          guestId: user?.id.toString(),
        });
        getSessionData();
      }
      if (user.role === 'user') {
        await joinSessionFromUrl({ sessionId: getRoomIDFromUrl(location.pathname) ?? '', id: user?.id.toString() });
        getSessionData();
      }

      return null;
    };

    getSessionData();
  }, [location.pathname, user, joinSessionFromUrl, navigate, toast]);

  return { session, setSession, dataLoading };
}
