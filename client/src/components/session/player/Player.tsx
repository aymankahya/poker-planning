import HoverCard from '@/components/common/HoverCard';
import KickOutButton from '@/components/session/player/components/KickOutButton';
import PlayerCard from '@/components/session/player/components/PlayerCard';
import { useAuth } from '@/hooks';
import useSession from '@/hooks/useSession';

type PlayerProps = {
  name?: string;
  side: 'top' | 'right' | 'bottom' | 'left';
};

export default function Player({ name = 'Player name', side }: PlayerProps) {
  // If the current User is admin => Show hover card for all players but himself
  const { user } = useAuth();
  const { session } = useSession();

  return (session?.admin.includes(user?.id.toString() ?? '') || session?.settings.adminAll) &&
    user?.username !== name ? (
    <HoverCard
      trigger={
        <div className="flex flex-col items-center gap-2 max-w-[100px] w-full ">
          <PlayerCard />
          <p className="text-sm text-center break-words font-bold cursor-pointer">{name}</p>
        </div>
      }
      hoverContent={<KickOutButton />}
      delay={10}
      side={side}
    />
  ) : (
    <div className="flex flex-col items-center justify-center gap-2">
      <PlayerCard className="cursor-auto hover:bg-inherit" />
      <p className="text-sm text-center break-words font-bold">{name}</p>
    </div>
  );
}
