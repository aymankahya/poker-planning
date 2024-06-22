import { SettingContext } from '@/context/SettingProvider';
import { useContext } from 'react';

export default function useSettings() {
  const context = useContext(SettingContext);

  if (context === undefined) {
    throw new Error('useSettings must be used inside a SettingProvider');
  }

  return { settings: context?.settings, setSettings: context?.setSettings ?? (() => {}) };
}
