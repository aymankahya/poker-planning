import { PropsWithChildren, createContext, useMemo, useState } from 'react';

type IssueBarContextType = {
  barOpened: boolean;
  setBarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IssueBarContext = createContext<IssueBarContextType>({ barOpened: false, setBarOpened: () => {} });

export default function IssueBarProvider({ children }: PropsWithChildren) {
  const [barOpened, setBarOpened] = useState<boolean>(false);
  const providerValue = useMemo(() => {
    return { barOpened, setBarOpened };
  }, [barOpened]);
  return <IssueBarContext.Provider value={providerValue}>{children}</IssueBarContext.Provider>;
}
