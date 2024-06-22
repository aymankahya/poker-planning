import { useToast } from '@/components/ui/use-toast';
import { getRoomIDFromUrl } from '@/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useUpdateSessionSettings() {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { toast } = useToast();

  const updateSessionSettings = async (
    sessionName: string,
    sessionAdmin: string[],
    votingSystem: (string | number)[],
  ) => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/update-session-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: getRoomIDFromUrl(location.pathname),
        sessionName,
        sessionAdmin,
        votingSystem,
      }),
    });

    if (!response.ok) {
      toast({
        title: 'Session Settings Update Failed !',
        description: 'Oops ! Something went wrong. Please try again',
        variant: 'destructive',
      });
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  };

  return { updateSessionSettings, loading };
}
