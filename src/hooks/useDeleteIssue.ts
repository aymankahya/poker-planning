import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { useLocation } from 'react-router-dom';

export default function useDeleteIssue() {
  const location = useLocation();
  const { socket } = useSocket();

  const handleDeleteIssue = (issueId: string) => {
    socket?.emit('delete-issue', getRoomIDFromUrl(location.pathname), issueId);
  };

  return { handleDeleteIssue };
}
