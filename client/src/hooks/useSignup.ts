import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import useSettings from '@/hooks/useSettings';
import { useState } from 'react';

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function useSignup() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { setUser } = useAuth();
  const { setSettings } = useSettings();

  const signup = async (data: SignUpData) => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 409) {
      setLoading(false);
      return toast({
        title: 'Oops! Something went wrong',
        description:
          'Email already linked to an existing account. Use a different email or login using your credentials',
        variant: 'destructive',
      });
    }

    if (response.status === 200) {
      const jsonRes = await response.json();

      setLoading(false);

      localStorage.setItem('token', jsonRes.token);

      setUser({ username: jsonRes.user.username, id: jsonRes.user.id, role: jsonRes.user.role });
      localStorage.setItem(
        'user',
        JSON.stringify({ id: jsonRes.user.id, username: jsonRes.user.username, role: 'user' }),
      );

      setSettings(jsonRes.user.settings);

      localStorage.setItem('settings', JSON.stringify(jsonRes.user.settings));

      window.location.href = '/';

      return true;
    }

    setLoading(false);
    return toast({
      title: 'Oops! Something went wrong',
      description: 'An error occured during user sign up. Please try agin.',
      variant: 'destructive',
    });
  };

  return { loading, signup };
}
