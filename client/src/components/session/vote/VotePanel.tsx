import VoteCard from '@/components/session/vote/components/VoteCard';
import useIssueBar from '@/hooks/useIssueBar';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';

const DEFAULT_VOTING_SYSTEMS = new Map([
  [1, [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, String.fromCodePoint(0x2615), '?']],
  [2, [0, '½', 1, 2, 3, 5, 8, 13, 20, 40, 100]],
  [3, ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']],
]);

export default function VotePanel() {
  const { issueBarContext } = useIssueBar();
  const { session } = useSession();
  return (
    <div
      className={cx('flex flex-col gap-5 items-center justify-start min-h-[10rem]', {
        'mr-[35rem]': issueBarContext.barOpened,
      })}
    >
      <p className="typography-small text-lg font-medium">Pick your points</p>
      <div className="flex items-center justify-center gap-2 ">
        {DEFAULT_VOTING_SYSTEMS.get(session?.settings.votingSystem ?? 1)?.map((point) => (
          <VoteCard key={point} point={point} />
        ))}
      </div>
    </div>
  );
}
