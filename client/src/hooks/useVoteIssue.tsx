import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import useSession from '@/hooks/useSession';
import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { useLocation } from 'react-router-dom';

export default function useVoteIssue() {
  const { session } = useSession();
  const { user } = useAuth();
  const { socket } = useSocket();
  const location = useLocation();
  const { toast } = useToast();

  const handleVoteIssue = (issueId: string) => {
    if (!session?.settings.adminAll && !session?.admin.includes(user?.id.toString() ?? '')) {
      return toast({
        title: "You don't have permission to manage issues",
        description: 'Change "who can manage issues" at game settings',
        variant: 'destructive',
      });
    }
    return socket?.emit('set-active-issue', getRoomIDFromUrl(location.pathname), issueId);
  };

  return { handleVoteIssue };
}
