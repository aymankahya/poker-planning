import { InvitePlayersDialog } from '@/components/session/header/components';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function InvitePlayers() {
  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger className="max-[580px]:hidden">
        <InvitePlayersDialog />
      </HoverCardTrigger>
      <HoverCardContent className="text-sm text-white p-2 w-fit border-0 bg-slate-700" align="end" sideOffset={10}>
        Invite other people
      </HoverCardContent>
    </HoverCard>
  );
}
