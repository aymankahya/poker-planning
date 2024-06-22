import { Button } from '@/components/ui/button';
import useSession from '@/hooks/useSession';
import useSubmitVote from '@/hooks/useSubmitVote';
import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

type VoteCardProps = {
  point: number | string | ReactNode;
  active: boolean;
};

export default function VoteCard({ point, active = false }: VoteCardProps) {
  const { submitVote } = useSubmitVote();
  const { session } = useSession();
  return (
    <Button
      disabled={session?.votingState === 'completed'}
      onClick={(e) => submitVote(e)}
      variant="outline"
      className={cx(
        'text-[16px] hover:bg-slate-700 hover:text-white hover:-translate-y-3 transition-transform ease-out duration-700 p-3 h-auto min-w-[60px]',
        {
          'bg-slate-700 text-white hover:transform-none': active,
        },
      )}
    >
      {point}
    </Button>
  );
}
