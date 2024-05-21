import useSession from '@/hooks/useSession';
import { getRoomIDFromUrl } from '@/utils';
import { useLocation } from 'react-router-dom';

export default function useUpdateSession() {
  const { setSession } = useSession();
  const location = useLocation();

  const updateSession = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/session-data?id=${getRoomIDFromUrl(location.pathname)}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    setSession({ ...data, votingState: 'idle' });
  };

  return { updateSession };
}
