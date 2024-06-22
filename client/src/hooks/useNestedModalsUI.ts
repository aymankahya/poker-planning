import { NestedModalsUIContext } from '@/context/NestedModalsUIProvider';
import { useContext } from 'react';

export default function useNestedModalsUI() {
  const context = useContext(NestedModalsUIContext);

  if (context === undefined) {
    throw new Error('useSessionContextUI must be used inside an SessionSettingsUIProvider');
  }

  return {
    hidden: context?.hidden,
    setHidden: context?.setHidden ?? (() => {}),
    customVotingOpen: context?.customVotingOpen,
    setOpenCustomVoting: context?.setOpenCustomVoting ?? (() => {}),
  };
}
