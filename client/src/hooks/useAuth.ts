import { AuthContext } from '@/context/AuthProvider';
import { useContext } from 'react';

export default function useAuth() {
  const userContext = useContext(AuthContext);

  if (userContext === undefined) {
    throw new Error('useAuth must be used inside an AuthContextProvider');
  }

  return {
    user: userContext?.user,
    setUser: userContext?.setUser ?? (() => {}),
    isAuth: userContext?.isAuth,
    authLoading: userContext?.authLoading,
  };
}
