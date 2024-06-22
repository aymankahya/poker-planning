import VoteCard from '@/components/session/vote/components/VoteCard';
import { useAuth } from '@/hooks';
import useIssueBar from '@/hooks/useIssueBar';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';

export default function VotePanel() {
  const { issueBarContext } = useIssueBar();
  const { user } = useAuth();
  const { session } = useSession();
  return (
    <div
      className={cx('flex flex-col gap-5 items-center justify-start min-h-[10rem]', {
        'mr-[35rem]': issueBarContext.barOpened,
      })}
    >
      <p className="typography-small text-lg font-medium">Pick your points</p>
      <div className="flex items-center justify-center gap-2 ">
        {session?.settings.votingSystem.map((point) => (
          <VoteCard
            key={point}
            point={point}
            active={session?.currentVotes[user?.id.toString() ?? ''] === point.toString()}
          />
        ))}
      </div>
    </div>
  );
}
