import CreateCustomVotingSystemForm from '@/components/session/create/CustomVotingSystem/CreateCustomVotingSystemForm';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import useNestedModalsUI from '@/hooks/useNestedModalsUI';

export default function CreateCustomVotingSystem() {
  const { setHidden, customVotingOpen, setOpenCustomVoting } = useNestedModalsUI();
  return (
    <Dialog
      open={customVotingOpen}
      onOpenChange={(open) => {
        setOpenCustomVoting(open);
        setHidden(open);
      }}
    >
      <DialogContent>
        <DialogHeader>Custom Voting System</DialogHeader>
        <CreateCustomVotingSystemForm closeDialog={setOpenCustomVoting} />
      </DialogContent>
    </Dialog>
  );
}
