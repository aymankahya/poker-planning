import { Session } from '@/types/Session';
import { Dispatch } from 'react';

export type SessionContextType = {
  session: Session | null;
  setSession: Dispatch<React.SetStateAction<Session | null>>;
  dataLoading: boolean;
};
