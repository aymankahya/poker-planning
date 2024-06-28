import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Copy, UserRoundPlus } from 'lucide-react';
import { buttonStyle } from '@/components/session/sidebar/IssueSideBar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import { getRoomIDFromUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cx } from 'class-variance-authority';

type InvitePlayersDialogProps = {
  className?: string;
  openDialog?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InvitePlayersDialog({
  className,
  openDialog = undefined,
  setOpen = () => {},
}: InvitePlayersDialogProps) {
  const location = useLocation();
  const { toast } = useToast();

  const handleCopyInvite = (copyValue: string, notificationMessage: string) => {
    navigator.clipboard.writeText(copyValue);
    toast({
      description: notificationMessage,
      variant: 'success',
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger className={cx(buttonStyle, className)}>
        <UserRoundPlus />
      </DialogTrigger>
      <DialogContent className="max-w-[45rem]">
        <DialogHeader className="typography-h3">Invite Other Players</DialogHeader>
        <DialogDescription>
          To invite other players to this session, you can either:
          <ul className="list-disc pl-5 mt-2 leading-6">
            <li>
              <b>Send the Invite URL:</b> This will allow them to directly access the session if they are already logged
              into their account.
            </li>

            <li>
              <b>Share the Session ID:</b> They can join the session by entering this ID using the &quot;Join
              Session&quot; button on the home page.
            </li>
          </ul>
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="url" className="font-bold ">
              Invite URL
            </Label>
            <div className="flex w-full items-center space-x-2">
              <Input id="url" defaultValue={window.location.href} readOnly className="focus-visible:ring-0" />
              <DialogClose>
                <Button onClick={() => handleCopyInvite(window.location.href, 'Invite URL copied to clipboard')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
          <div>
            <Label htmlFor="sessionId" className="font-bold ">
              Session ID
            </Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="sessionId"
                defaultValue={getRoomIDFromUrl(location.pathname)}
                readOnly
                className="focus-visible:ring-0"
              />
              <DialogClose>
                <Button
                  onClick={() =>
                    handleCopyInvite(getRoomIDFromUrl(location.pathname) ?? '', 'Session ID copied to clipboard')
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
