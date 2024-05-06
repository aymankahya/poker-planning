import { SessionContext } from '@/context/SessionProvider';
import { useContext } from 'react';

export default function useSession() {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSession must be used inside a SessionProvider');
  }

  return { ...context };
}
