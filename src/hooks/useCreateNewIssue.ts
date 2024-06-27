import { useToast } from '@/components/ui/use-toast';
import useSocket from '@/hooks/useSocket';
import { CreateNewIssueFormFields } from '@/types';
import { getRoomIDFromUrl } from '@/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useCreateNewIssue() {
  const { toast } = useToast();
  const { socket } = useSocket();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  const createNewIssue = async (data: CreateNewIssueFormFields) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, sessionId: getRoomIDFromUrl(location.pathname) }),
      });

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem when creating issue.',
        });
        return setLoading(false);
      }

      socket?.emit('update-all-session', getRoomIDFromUrl(location.pathname));
      return setLoading(false);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when creating issue.',
      });
      return setLoading(false);
    }
  };

  return { loading, createNewIssue };
}
