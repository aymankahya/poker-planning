import { useToast } from '@/components/ui/use-toast';
import useNestedModalsUI from '@/hooks/useNestedModalsUI';
import useSettings from '@/hooks/useSettings';
import { useState } from 'react';

export default function useCreateCustomVotingSystem() {
  const { toast } = useToast();
  const { settings, setSettings } = useSettings();
  const { setHidden } = useNestedModalsUI();
  const [loading, setLoading] = useState<boolean>(false);

  const createCustomVotingSystem = async (id: string, label: string, values: string) => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-custom-voting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, label, values }),
    });

    if (!response.ok) {
      setLoading(false);
      toast({
        title: 'Custom Voting System Creation Failed !',
        description: 'Oops ! Something went wrong. Please try again',
        variant: 'destructive',
      });

      return false;
    }

    const dataRes = await response.json();
    setSettings({ ...settings, customVotingSystem: dataRes.customVotingSystem });
    localStorage.setItem('settings', JSON.stringify({ ...settings, customVotingSystem: dataRes.customVotingSystem }));
    setHidden(false);

    return true;
  };

  return { createCustomVotingSystem, loading };
}
