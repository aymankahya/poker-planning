import { useToast } from '@/components/ui/use-toast';
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

      const data = await response.json();
      setSession({ ...data, votingState: 'idle' });
      return setDataLoading(false);
    };

    getSessionData();
  }, [location.pathname, navigate, toast]);

  return { session, setSession, dataLoading };
}
