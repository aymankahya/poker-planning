import { HoverCard as HoverCardUI, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { ReactNode } from 'react';

type HoverCardProps = {
  trigger: ReactNode;
  hoverContent: string | ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  open?: boolean;
};

export default function HoverCard({
  trigger,
  hoverContent,
  delay,
  side,
  sideOffset,
  align,
  alignOffset,
  open,
}: HoverCardProps) {
  return (
    <HoverCardUI openDelay={delay} closeDelay={delay} open={open}>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="border-0 shadow-none w-fit bg-transparent"
      >
        {hoverContent}
      </HoverCardContent>
    </HoverCardUI>
  );
}
