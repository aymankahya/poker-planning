import VoteCard from '@/components/session/vote/components/VoteCard';
import { useAuth } from '@/hooks';
import useIssueBar from '@/hooks/useIssueBar';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';
import { useOverflowDetector } from 'react-detectable-overflow';

export default function VotePanel() {
  const { ref, overflow } = useOverflowDetector();
  const { issueBarContext } = useIssueBar();
  const { user } = useAuth();
  const { session } = useSession();
  return (
    <div
      className={cx('flex flex-col gap-5 items-center justify-end pb-10 min-h-[10rem]', {
        'mr-[35rem] max-[1200px]:mr-[30rem] max-[1120px]:mr-0 max-[960px]:mr-0': issueBarContext.barOpened,
      })}
    >
      <p className="typography-small text-lg font-medium max-[640px]:text-sm">Pick your points</p>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cx(
          'w-full flex items-center justify-center gap-2 snap-x snap-mandatory overflow-x-auto py-2',
          {
            'max-[1470px]:px-10': issueBarContext.barOpened,
          },
          { '!justify-start px-10': overflow },
        )}
      >
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
