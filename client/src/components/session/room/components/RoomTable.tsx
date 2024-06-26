import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks';
import useSession from '@/hooks/useSession';
import useSocket from '@/hooks/useSocket';
import { getRoomIDFromUrl } from '@/utils';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export default function RoomTable() {
  const { session } = useSession();
  const { user } = useAuth();
  const { socket } = useSocket();
  const location = useLocation();
  const players = [...(session?.players ?? []), ...(session?.guests ?? [])];

  let tableState = 'pick';
  const hasVoted = Object.keys(session?.currentVotes ?? {}).includes(user?.id.toString() ?? '');
  const allVoted = Object.keys(session?.currentVotes ?? {}).length === players.length;
  const isAdmin = session?.admin.includes(user?.id.toString() ?? '') || session?.settings.adminAll;
  const voteDone = session?.votingState === 'completed';

  if (hasVoted && isAdmin && allVoted && !voteDone) {
    tableState = 'reveal';
  } else if (hasVoted && !voteDone) {
    tableState = 'waiting';
  } else if (!hasVoted) {
    tableState = 'pick';
  } else if (voteDone && !isAdmin) {
    tableState = 'waitingNewVote';
  } else if (voteDone) {
    tableState = 'newVote';
  }

  const tableContent: { [key: string]: ReactNode } = {
    waiting: <p className="max-[400px]:px-1 text-center">Waiting for other player&apos;s votes...</p>,
    pick: <p className="max-[400px]:px-1 text-center">Pick your card !</p>,
    reveal: (
      <Button
        onClick={() => socket?.emit('reveal-cards', getRoomIDFromUrl(location.pathname))}
        className="min-w-[190px] text-md max-[640px]:min-w-[150px] max-[400px]:min-w-[100px]"
      >
        Reveal cards
      </Button>
    ),
    waitingNewVote: <p className="max-[400px]:px-1 text-center">Waiting for new vote</p>,
    newVote: (
      <Button
        onClick={() => socket?.emit('start-new-vote', getRoomIDFromUrl(location.pathname))}
        className="min-w-[190px] text-md max-[640px]:min-w-[150px] max-[400px]:min-w-[100px]"
      >
        Start new vote
      </Button>
    ),
  };

  return (
    <div className=" flex items-center justify-center w-full min-h-[10rem] h-auto rounded-3xl bg-slate-200 max-[640px]:min-h-[10rem]">
      {tableContent[tableState]}
    </div>
  );
}
