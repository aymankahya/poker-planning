import CreateSessionForm from '@/components/session/create/CreateSessionForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CreateSession() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-black/90 transition-all ease-in-out duration-300">Create a session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a New Session</DialogTitle>
        <CreateSessionForm />
      </DialogContent>
    </Dialog>
  );
}
