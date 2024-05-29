import SessionControl from '@/components/session/header/components/SessionControl';
import useSession from '@/hooks/useSession';

export default function SessionInfo() {
  const { session } = useSession();
  return (
    <div className="flex flex-col items-start justify-center h-[4rem]">
      <SessionControl />
      {session?.votingState === 'inProgress' && (
        <span aria-live="polite" className="text-slate-500 ml-[16px]">
          Voting : <span className="font-bold italic">Name</span>{' '}
        </span>
      )}
    </div>
  );
}
