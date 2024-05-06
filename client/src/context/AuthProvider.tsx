import { ReactNode, createContext, useMemo, useState } from 'react';
import useCheckAuth from '@/hooks/useCheckAuth';

type AuthProviderProp = {
  children: ReactNode;
};

type User = {
  username: string;
  id: number;
};

type AuthContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuth: boolean;
  authLoading: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthContextProvider({ children }: AuthProviderProp) {
  const { isAuth, authLoading } = useCheckAuth();
  const storedUser: User | null = JSON.parse(localStorage.getItem('user') ?? 'null');
  const [user, setUser] = useState<User | null>(storedUser);
  const authValue = useMemo(() => {
    return { user, setUser, isAuth, authLoading };
  }, [user, isAuth, authLoading]);
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
