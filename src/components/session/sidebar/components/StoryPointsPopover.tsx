import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover } from '@/components/ui/popover';
import useSession from '@/hooks/useSession';
import useSetStoryPoint from '@/hooks/useSetStoryPoint';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { cx } from 'class-variance-authority';
import { useState } from 'react';

type StoryPointsPopoverProps = {
  issueId: string;
  value: string;
  hideHoverContentOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  open?: boolean;
};

export default function StoryPointsPopover({
  issueId,
  value,
  className,
  hideHoverContentOnOpen,
  open,
}: StoryPointsPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { session } = useSession();
  const { handleSetIssueStoryPoints } = useSetStoryPoint();
  return (
    <Popover
      onOpenChange={(openState) => {
        hideHoverContentOnOpen(openState);
        setPopoverOpen(openState);
      }}
      open={open !== undefined ? open : popoverOpen}
    >
      <PopoverTrigger asChild>
        <Button className={cx('bg-slate-200 text-black hover:bg-slate-300', className)}>{value}</Button>
      </PopoverTrigger>
      <PopoverContent side="left" sideOffset={10}>
        <Card className="border-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <CardContent className="grid grid-cols-4 gap-2 p-2 max-w-[300px] ">
            {session?.settings.votingSystem.length !== 0 ? (
              session?.settings.votingSystem.map((vote) => {
                return (
                  <Button
                    key={vote}
                    variant="ghost"
                    className="p-3 rounded-full"
                    onClick={(e) => {
                      handleSetIssueStoryPoints(issueId, (e.target as HTMLElement).innerText);
                      setPopoverOpen(false);
                    }}
                  >
                    {vote}
                  </Button>
                );
              })
            ) : (
              <p>Oops ! Something went wrong</p>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
