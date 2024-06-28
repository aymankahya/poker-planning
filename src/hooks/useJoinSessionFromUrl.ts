import { useToast } from '@/components/ui/use-toast';
import useLoginGuest from '@/hooks/useLoginGuest';
import { JoinSessionFormFields } from '@/types';

export default function useJoinSessionFromUrl() {
  const { toast } = useToast();
  const { loginGuest } = useLoginGuest();

  const joinSessionFromUrl = async (
    data: JoinSessionFormFields & { id?: number | undefined } & { guestId?: number | undefined },
  ) => {
    try {
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
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem when joining session',
        });
      }

      return true;
    } catch (err) {
      return toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when creating session.',
      });
    }
  };

  return { joinSessionFromUrl };
}
