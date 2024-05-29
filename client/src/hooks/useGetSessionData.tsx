import { useToast } from '@/components/ui/use-toast';
import useJoinSessionFromUrl from '@/hooks/useJoinSessionFromUrl';
import { Session } from '@/types';
import { getRoomIDFromUrl } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useGetSessionData() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const location = useLocation();
  const { joinSessionFromUrl } = useJoinSessionFromUrl();
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') ?? 'null'), [localStorage.getItem('user')]);

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
      } else if (
        data.players.some((player) => player.id === user?.id.toString()) ||
        data.guests.some((guest) => guest.id === user?.id.toString())
      ) {
        setSession({ ...data });
        setDataLoading(false);
      } else if (user?.role === 'guest') {
        await joinSessionFromUrl({
          sessionId: getRoomIDFromUrl(location.pathname) ?? '',
          guestId: user?.id.toString(),
        });
        getSessionData();
      } else if (user.role === 'user') {
        await joinSessionFromUrl({ sessionId: getRoomIDFromUrl(location.pathname) ?? '', id: user?.id.toString() });
        getSessionData();
      }

      return null;
    };

    getSessionData();
  }, []);

  return { session, setSession, dataLoading };
}
