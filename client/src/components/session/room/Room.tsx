import Player from '@/components/session/player/Player';
import RoomTable from '@/components/session/room/components/RoomTable';
import useIssueBar from '@/hooks/useIssueBar';
import { cx } from 'class-variance-authority';

export default function Room() {
  const { issueBarContext } = useIssueBar();
  return (
    <div className={cx('m-auto', { 'pr-[35rem]': issueBarContext.barOpened })}>
      <div className="grid grid-cols-[100px_minmax(200px,_300px)_100px]  min-h-[200px] gap-5">
        {/* Left Side */}
        <div className="flex flex-col items-center w-full justify-between row-span-4 justify-self-end self-center">
          <Player />
        </div>
        {/* Top Side */}
        <div className="flex items-center justify-center w-full  col-span-1 row-span-1 justify-self-center ">
          <Player />
        </div>
        {/* Right Side */}
        <div className="row-span-3 self-center">
          <Player />
        </div>
        <RoomTable />
        {/* Bottom Side */}
        <div className="flex items-center w-full justify-center col-span-1 row-span-1 justify-self-center">
          <Player />
        </div>
      </div>
    </div>
  );
}
