import Player from '@/components/session/player/Player';
import RoomTable from '@/components/session/room/components/RoomTable';
import useIssueBar from '@/hooks/useIssueBar';
import useSession from '@/hooks/useSession';
import { splitPlayers } from '@/utils';
import { cx } from 'class-variance-authority';

export default function Room() {
  const { issueBarContext } = useIssueBar();
  const { session } = useSession();
  const playersAndGuests = [...(session?.players ?? []), ...(session?.guests ?? [])];
  const players = splitPlayers(playersAndGuests);

  return (
    <div
      className={cx('m-auto', {
        'pr-[35rem] max-[1200px]:pr-[30rem] max-[1120px]:pr-0 ': issueBarContext.barOpened,
      })}
    >
      <div className="grid grid-cols-[100px_minmax(400px,_1fr)_100px] min-h-[200px] gap-5 max-[640px]:grid-cols-[50px_minmax(300px,_1fr)_50px] max-[470px]:grid-cols-[50px_250px_50px] max-[400px]:grid-cols-[50px_minmax(150px,_150px)_50px] max-[640px]:text-sm max-[400px]:text-xs max-[400px]:gap-3">
        {/* Left Side */}
        <div className="flex flex-col items-center w-full row-span-4 justify-self-end self-center">
          {players?.left.map((player) => {
            return <Player key={player.id} playerInfo={player} side="top" />;
          })}
        </div>
        {/* Top Side */}
        <div className="flex items-start justify-center gap-5 w-full col-span-1 row-span-1 justify-self-center h-[100px] max-[400px]:gap-2 ">
          {players?.top.map((player) => {
            return <Player key={player.id} playerInfo={player} side="top" />;
          })}
        </div>
        {/* Right Side */}
        <div className="row-span-3 self-center flex flex-col gap-4">
          {players?.right.map((player) => {
            return <Player key={player.id} playerInfo={player} side="top" />;
          })}
        </div>
        <RoomTable />
        {/* Bottom Side */}
        <div
          className={cx(
            'flex items-start grow w-full justify-center gap-5 col-span-1 row-span-1 justify-self-end h-[100px] max-[400px]:gap-2 ',
            {
              'justify-between max-[470px]:justify-center': players.bottom.length > 2,
            },
          )}
        >
          {players?.bottom.map((player) => {
            return <Player key={player.id} playerInfo={player} side="bottom" />;
          })}
        </div>
      </div>
    </div>
  );
}
