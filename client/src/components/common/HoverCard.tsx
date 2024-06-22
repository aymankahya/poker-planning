import { HoverCard as HoverCardUI, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { ReactNode } from 'react';

type HoverCardProps = {
  trigger: ReactNode;
  hoverContent: string | ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export default function HoverCard({ trigger, hoverContent, delay, side }: HoverCardProps) {
  return (
    <HoverCardUI openDelay={delay} closeDelay={delay}>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent side={side} className="border-0 shadow-none w-fit bg-transparent">
        {hoverContent}
      </HoverCardContent>
    </HoverCardUI>
  );
}
