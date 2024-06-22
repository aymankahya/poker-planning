import { useToast } from '@/components/ui/use-toast';

export default function useLogout() {
  const { toast } = useToast();

  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
      method: 'POST',
    });

    if (!response.ok) return toast({ variant: 'destructive', description: 'An error occured while login you out !' });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    // Return null here for consistent-return rule in ESLint
    return null;
  };

  return { logout };
}
