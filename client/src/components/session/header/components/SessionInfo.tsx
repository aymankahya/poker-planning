import SessionControl from '@/components/session/header/components/SessionControl';
import useSession from '@/hooks/useSession';

export default function SessionInfo() {
  const { session } = useSession();
  return (
    <div className="flex flex-col items-start justify-center h-[4rem] max-[580px]:items-center">
      <SessionControl />
      {(session?.votingState === 'inProgress' || session?.activeIssue !== '') && (
        <span
          aria-live="polite"
          className="text-slate-500 ml-[16px] max-[580px]:text-sm max-[580px]:ml-0 max-[580px]:text-center max-[355px]:text-xs"
        >
          <p className="max-[355px]:mb-1">{session?.activeIssue ? 'Voting In Progress : ' : 'Voting In Progress'}</p>
          <p className="inline font-bold italic max-[580px]:inline-block max-[580px]:max-w-[23ch] max-[580px]:overflow-hidden max-[580px]:text-ellipsis max-[580px]:truncate max-[580px]:-mb-[5px]">
            {session?.issues.find((issue) => issue.id === session.activeIssue)?.title}
          </p>
        </span>
      )}
    </div>
  );
}
