import { AuthContext } from '@/context/AuthProvider';
import { useContext } from 'react';

export default function useAuth() {
  const user = useContext(AuthContext);

  if (user === undefined) {
    throw new Error('useAuth must be used inside an AuthContextProvider');
  }

  return { user };
}
