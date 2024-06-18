import SessionControl from '@/components/session/header/components/SessionControl';
import useSession from '@/hooks/useSession';

export default function SessionInfo() {
  const { session } = useSession();
  return (
    <div className="flex flex-col items-start justify-center h-[4rem]">
      <SessionControl />
      {(session?.votingState === 'inProgress' || session?.activeIssue !== '') && (
        <span aria-live="polite" className="text-slate-500 ml-[16px]">
          {session?.activeIssue ? 'Voting In Progress : ' : 'Voting In Progress'}
          <span className="font-bold italic">
            {session?.issues.find((issue) => issue.id === session.activeIssue)?.title}
          </span>{' '}
        </span>
      )}
    </div>
  );
}
