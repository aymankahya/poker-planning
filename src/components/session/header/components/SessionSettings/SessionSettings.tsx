import SessionSettingsForm from '@/components/session/header/components/SessionSettings/SessionSettingsForm';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import useNestedModalsUI from '@/hooks/useNestedModalsUI';
import { cx } from 'class-variance-authority';

type SessionSettingsProps = {
  openState: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SessionSettings({ openState, setOpenSettings }: SessionSettingsProps) {
  const { hidden } = useNestedModalsUI();
  return (
    <Dialog open={openState} onOpenChange={(open) => setOpenSettings(open)}>
      <DialogContent className={cx({ hidden })}>
        <DialogHeader className="typography-h3">Session Settings</DialogHeader>
        <SessionSettingsForm closeSettings={setOpenSettings} />
      </DialogContent>
    </Dialog>
  );
}
