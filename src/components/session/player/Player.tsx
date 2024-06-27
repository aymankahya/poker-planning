import HoverCard from '@/components/common/HoverCard';
import KickOutButton from '@/components/session/player/components/KickOutButton';
import PlayerCard from '@/components/session/player/components/PlayerCard';
import { useAuth } from '@/hooks';
import useSession from '@/hooks/useSession';

type PlayerProps = {
  playerInfo?: { id: string; username: string };
  side: 'top' | 'right' | 'bottom' | 'left';
};

export default function Player({ playerInfo = { id: '', username: 'Anonymous' }, side }: PlayerProps) {
  // If the current User is admin => Show hover card for all players but himself
  const { user } = useAuth();
  const { session } = useSession();

  return (session?.admin.includes(user?.id.toString() ?? '') || session?.settings.adminAll) &&
    user?.id.toString() !== playerInfo.id ? (
    <HoverCard
      trigger={
        <div className="flex flex-col items-center gap-2 max-w-[100px] w-full ">
          <PlayerCard
            visible={session?.votingState === 'completed'}
            score={session?.currentVotes[playerInfo?.id]}
            hasVoted={Object.keys(session?.currentVotes).includes(playerInfo?.id)}
          />
          <p className="text-sm text-center font-bold cursor-pointer max-[640px]:text-xs">{playerInfo.username}</p>
        </div>
      }
      hoverContent={<KickOutButton />}
      delay={10}
      side={side}
    />
  ) : (
    <div className="flex flex-col items-center max-w-[100px] justify-center gap-2">
      <PlayerCard
        visible={session?.votingState === 'completed'}
        score={session?.currentVotes[playerInfo?.id] ?? ''}
        hasVoted={Object.keys(session?.currentVotes ?? {}).includes(playerInfo?.id) ?? false}
        className="cursor-auto"
      />
      <p className="text-sm text-center font-bold max-[640px]:text-xs">{playerInfo.username}</p>
    </div>
  );
}
