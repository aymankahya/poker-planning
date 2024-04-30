import { ReactNode, createContext, useMemo, useState } from 'react';

type AuthProviderProp = {
  children: ReactNode;
};

type User = {
  username: string;
};

type AuthContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthContextProvider({ children }: AuthProviderProp) {
  const storedUser: User | null = JSON.parse(localStorage.getItem('user') ?? 'null');
  const [user, setUser] = useState<User | null>(storedUser);
  const authValue = useMemo(() => {
    return { user, setUser };
  }, [user]);
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
