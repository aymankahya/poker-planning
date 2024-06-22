import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

type VoteCardProps = {
  point: number | string | ReactNode;
};

export default function VoteCard({ point }: VoteCardProps) {
  return (
    <Button variant="outline" className="text-[16px] hover:bg-slate-700 hover:text-white p-3 h-auto min-w-[60px]">
      {point}
    </Button>
  );
}
