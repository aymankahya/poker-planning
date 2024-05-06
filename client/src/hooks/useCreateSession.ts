import { useToast } from '@/components/ui/use-toast';
import { CreateSessionFormFields } from '@/types';
import { useState } from 'react';
import { io } from 'socket.io-client';

export default function useCreateSession() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const createSession = async (data: CreateSessionFormFields & { id: number | undefined }) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { sessionId } = await response.json();

      const socket = io(`${import.meta.env.VITE_SERVER_URL}/session`);

      socket.emit('create-session', sessionId);

      socket.on('session-joined', () => {
        window.location.href = `session/${sessionId}`;
        setLoading(false);
      });

      socket.on('error-joining-session', () => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem when joining session.',
        });
        setLoading(false);
      });
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
