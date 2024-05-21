import { useToast } from '@/components/ui/use-toast';
import useLoginGuest from '@/hooks/useLoginGuest';
import { JoinSessionFormFields } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useJoinSession() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loginGuest } = useLoginGuest();
  const [loading, setLoading] = useState<boolean>(false);

  const joinSession = async (
    data: JoinSessionFormFields & { id: number | undefined } & { guestId?: number | undefined },
  ) => {
    try {
      setLoading(true);
      let sessionData = data;
      if ('guestName' in data) {
        const guestId = loginGuest(data.guestName);
        sessionData = { ...data, guestId: await guestId };
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/join-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem when joining session',
        });
        return setLoading(false);
      }

      setLoading(false);
      return navigate(`session/${data.sessionId}`);
    } catch (err) {
      return toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when creating session.',
      });
    }
  };

  return { joinSession, loading };
}
