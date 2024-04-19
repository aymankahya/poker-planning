import { ReactNode, createContext } from 'react';

type AuthProviderProp = {
  children: ReactNode;
};

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }: AuthProviderProp) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
