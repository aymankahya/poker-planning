import VoteCard from '@/components/session/vote/components/VoteCard';
import useIssueBar from '@/hooks/useIssueBar';
import { cx } from 'class-variance-authority';
import { Coffee } from 'lucide-react';

export default function VotePanel() {
  const { issueBarContext } = useIssueBar();
  return (
    <div
      className={cx('flex flex-col gap-5 items-center justify-start min-h-[10rem]', {
        'mr-[35rem]': issueBarContext.barOpened,
      })}
    >
      <p className="typography-small text-lg font-medium">Pick your points</p>
      <div className="flex items-center justify-center gap-2 ">
        <VoteCard point={10} />
        <VoteCard point={<Coffee />} />
        <VoteCard point="?" />
      </div>
    </div>
  );
}
