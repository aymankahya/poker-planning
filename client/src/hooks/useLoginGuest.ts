import { toast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';

export default function useLoginGuest() {
  const { setUser } = useAuth();
  const loginGuest = async (guestName: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login-guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestName }),
      });

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem when creating guest user.',
        });
      }

      const jsonRes = await response.json();

      localStorage.setItem('token', jsonRes.token);
      localStorage.setItem('user', JSON.stringify({ id: jsonRes.id, username: jsonRes.username, role: 'guest' }));
      setUser({ username: jsonRes.username, id: jsonRes.id, role: 'guest' });
      return jsonRes.id;
    } catch (err) {
      throw new Error('err');
    }
  };

  return { loginGuest };
}
