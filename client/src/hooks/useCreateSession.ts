import { useToast } from '@/components/ui/use-toast';
import useLoginGuest from '@/hooks/useLoginGuest';
import { CreateSessionFormFields } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCreateSession() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginGuest } = useLoginGuest();
  const [loading, setLoading] = useState<boolean>(false);

  const createSession = async (
    data: CreateSessionFormFields & { id: number | undefined } & { guestId?: number | undefined },
  ) => {
    try {
      setLoading(true);
      let sessionData = data;
      if ('guestName' in data) {
        const guestId = loginGuest(data.guestName);
        sessionData = { ...data, guestId: await guestId };
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-session`, {
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
          description: 'There was a problem when joining session.',
        });
        setLoading(false);
      }

      const dataRes = await response.json();

      setLoading(false);
      navigate(`session/${dataRes.sessionId}`);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when creating session.',
      });
    }
  };

  return { createSession, loading };
}
