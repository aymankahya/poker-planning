import useSession from '@/hooks/useSession';
import { Session } from '@/types';

export default function useUpdateSession() {
  const { setSession } = useSession();

  const updateSession = (data: Session) => {
    setSession({ ...data });
  };

  return { updateSession };
}
