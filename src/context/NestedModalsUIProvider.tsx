import { PropsWithChildren, createContext, useMemo, useState } from 'react';

type NestedModalsUIContextValue = {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  customVotingOpen: boolean;
  setOpenCustomVoting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NestedModalsUIContext = createContext<NestedModalsUIContextValue | null>(null);

export default function NestedModalsUIProvider({ children }: PropsWithChildren) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [customVotingOpen, setOpenCustomVoting] = useState<boolean>(false);

  const contextValue = useMemo(() => {
    return { hidden, setHidden, customVotingOpen, setOpenCustomVoting };
  }, [hidden, customVotingOpen]);

  return <NestedModalsUIContext.Provider value={contextValue}>{children}</NestedModalsUIContext.Provider>;
}
