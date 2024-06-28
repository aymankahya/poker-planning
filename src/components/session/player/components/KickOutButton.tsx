import HoverCard from '@/components/common/HoverCard';
import { Button } from '@/components/ui/button';
import useSession from '@/hooks/useSession';
import useSocket from '@/hooks/useSocket';
import { User } from '@/types';
import { getRoomIDFromUrl } from '@/utils';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function KickOutButton({ player }: { player: User }) {
  const { session } = useSession();
  const { socket } = useSocket();
  const location = useLocation();
  const userRole = session?.players.includes(player) ? 'user' : 'guest';
  return (
    <HoverCard
      trigger={
        <Button
          className="rounded-full bg-red-500 p-2 hover:bg-red-600"
          onClick={() => {
            socket?.emit('kick-out-player', getRoomIDFromUrl(location.pathname), player.id, userRole);
          }}
        >
          <X />
        </Button>
      }
      hoverContent={<div className="text-sm text-white p-2 w-fit border-0 bg-slate-700 rounded-md ">Kick out</div>}
      delay={10}
    />
  );
}
