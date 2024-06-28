import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { useLocation } from 'react-router-dom';

export default function useSetStoryPoint() {
  const location = useLocation();
  const { socket } = useSocket();

  const handleSetIssueStoryPoints = (issueId: string, newValue: string) => {
    socket?.emit('set-estimated-points', getRoomIDFromUrl(location.pathname), issueId, newValue);
  };

  return { handleSetIssueStoryPoints };
}
