import { PropsWithChildren, createContext, useMemo, useState } from 'react';

type SettingsType = {
  customVotingSystem: { values: (string | number)[]; label: string }[];
};

type SettingContextValue = {
  settings: SettingsType | null;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType | null>>;
};

export const SettingContext = createContext<SettingContextValue | null>(null);

export default function SettingContextProvider({ children }: PropsWithChildren) {
  const storedSettings: SettingsType | null = JSON.parse(localStorage.getItem('settings') ?? 'null');
  const [settings, setSettings] = useState<SettingsType | null>(storedSettings);
  const settingsValue = useMemo(() => {
    return { settings, setSettings };
  }, [settings]);
  return <SettingContext.Provider value={settingsValue}>{children}</SettingContext.Provider>;
}
