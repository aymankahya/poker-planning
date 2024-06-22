import HoverCard from '@/components/common/HoverCard';
import KickOutButton from '@/components/session/player/components/KickOutButton';
import PlayerCard from '@/components/session/player/components/PlayerCard';

type PlayerProps = {
  name?: string;
};

export default function Player({ name = 'Player name' }: PlayerProps) {
  return (
    <HoverCard
      trigger={
        <div className="flex flex-col items-center gap-2">
          <PlayerCard />
          <p className="text-sm font-bold cursor-pointer">{name}</p>
        </div>
      }
      hoverContent={<KickOutButton />}
      delay={10}
    />
  );
}
