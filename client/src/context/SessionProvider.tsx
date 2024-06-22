import useGetSessionData from '@/hooks/useGetSessionData';
import { SessionContextType } from '@/types';
import { PropsWithChildren, createContext, useMemo } from 'react';

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
  dataLoading: true,
});

export default function SessionProvider({ children }: PropsWithChildren) {
  const { session, setSession, dataLoading } = useGetSessionData();

  const sessionProviderValue = useMemo(() => {
    return { session, setSession, dataLoading };
  }, [session, dataLoading, setSession]);

  return <SessionContext.Provider value={sessionProviderValue}>{children}</SessionContext.Provider>;
}
