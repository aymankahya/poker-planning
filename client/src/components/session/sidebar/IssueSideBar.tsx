import CreateNewIssueForm from '@/components/session/sidebar/components/CreateNewIssueForm';
import IssueCard from '@/components/session/sidebar/components/IssueCard';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks';
import useIssueBar from '@/hooks/useIssueBar';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';
import { Plus, Text } from 'lucide-react';
import { useState } from 'react';

export const buttonStyle = cx(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  'p-2 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
);

export default function IssueSideBar() {
  const { issueBarContext } = useIssueBar();
  const { session } = useSession();
  const { user } = useAuth();
  const [showAddIssueForm, setShowAddIssueForm] = useState<boolean>(false);
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
        <div className="mt-5">
          {session?.issues.map((issue) => {
            return (
              <IssueCard
                key={issue?.id}
                issueId={issue?.id}
                active={issue?.id === session.activeIssue}
                title={issue.title}
                type={issue.type}
                estimatedPoints={issue.estimatedPoints}
              />
            );
          })}

          {showAddIssueForm && <CreateNewIssueForm hideForm={setShowAddIssueForm} />}
          <Button
            variant="ghost"
            onClick={() => setShowAddIssueForm(true)}
            disabled={showAddIssueForm || !session?.admin.includes(user?.id.toString() ?? '')}
            className="flex items-center justify-start gap-2 text-md text-gray-400 w-full"
          >
            <Plus />
            Add a new issue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
