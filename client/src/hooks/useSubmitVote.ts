import useAuth from '@/hooks/useAuth';
import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { useLocation } from 'react-router-dom';

export default function useSubmitVote() {
  const location = useLocation();
  const { socket } = useSocket();
  const { user } = useAuth();

  const submitVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket?.emit('submit-vote', getRoomIDFromUrl(location.pathname), user?.id, (e.target as HTMLElement).innerText);
  };

  return { submitVote };
}
