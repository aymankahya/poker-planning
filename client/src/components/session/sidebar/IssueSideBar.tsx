import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import useIssueBar from '@/hooks/useIssueBar';
import { cx } from 'class-variance-authority';
import { Text } from 'lucide-react';

export const buttonStyle = cx(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  'p-2 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
);

export default function IssueSideBar() {
  const { issueBarContext } = useIssueBar();
  return (
    <Sheet modal={false} onOpenChange={() => issueBarContext.setBarOpened((prev) => !prev)}>
      <SheetTrigger>
        <HoverCard openDelay={10} closeDelay={10}>
          <HoverCardTrigger asChild>
            <div role="button" aria-label="Show issues" className={buttonStyle}>
              <Text />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm text-white p-2 w-fit border-0 bg-slate-700 " align="end" sideOffset={10}>
            Show issues
          </HoverCardContent>
        </HoverCard>
      </SheetTrigger>
      <SheetContent
        className="min-w-[35rem] shadow-none data-[state=open]:duration-150"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <h1 className="typography-h2">Issues</h1>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
