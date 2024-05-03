import { buttonStyle } from '@/components/session/sidebar/IssueSideBar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { UserRoundPlus } from 'lucide-react';

export default function InvitePlayers() {
  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger asChild>
        <div role="button" aria-label="Invite other people" className={buttonStyle}>
          <UserRoundPlus />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm text-white p-2 w-fit border-0 bg-slate-700 " align="end" sideOffset={10}>
        Invite other people
      </HoverCardContent>
    </HoverCard>
  );
}
