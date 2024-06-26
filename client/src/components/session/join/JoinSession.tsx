import JoinSessionForm from '@/components/session/join/JoinSessionForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function JoinSession() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-black/90 transition-all ease-in-out duration-300 min-w-[12rem]">
          Join a session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Join an Existing Session</DialogTitle>
        <JoinSessionForm />
      </DialogContent>
    </Dialog>
  );
}
