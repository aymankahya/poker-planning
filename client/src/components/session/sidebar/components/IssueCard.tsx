import HoverCard from '@/components/common/HoverCard';
import DeleteConfirmation from '@/components/session/sidebar/components/DeleteConfirmation';
import EditConfirmation from '@/components/session/sidebar/components/EditConfirmation';
import IssueCardMenu from '@/components/session/sidebar/components/IssueCardMenu';
import StoryPointsPopover from '@/components/session/sidebar/components/StoryPointsPopover';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks';
import useHandleEditIssue from '@/hooks/useHandleEditIssue';
import useSession from '@/hooks/useSession';
import useVoteIssue from '@/hooks/useVoteIssue';
import { cx } from 'class-variance-authority';
import { useRef, useState } from 'react';

type IssueCardProps = {
  issueId: string;
  type: string;
  title: string;
  estimatedPoints: string;
  active: boolean;
};

export default function IssueCard({ issueId, type, title, estimatedPoints, active = false }: IssueCardProps) {
  const [popoverOpened, setOpenPopover] = useState<boolean>(false);
  const [deleteConfirmationOpened, setOpenDeleteConfirmation] = useState<boolean>(false);
  const issueTypeRef = useRef<HTMLParagraphElement>(null);
  const issueTitleRef = useRef<HTMLParagraphElement>(null);
  const { session } = useSession();
  const { user } = useAuth();
  const { handleVoteIssue } = useVoteIssue();
  const { editCardActive, handleEditIssue, handleCancelEditIssue, confirmEditIssue } = useHandleEditIssue(
    issueTypeRef,
    issueTitleRef,
  );
  return (
    <Card
      className={cx(
        'border-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-5 bg-slate-100 transition-all duration-150 ease-in-out',
        {
          'bg-slate-800 shadow-[0_3px_10px_rgb(71,85,105,0.9)]': active,
        },
      )}
    >
      <CardHeader className="pt-3">
        <div className="flex items-center justify-between">
          <CardTitle
            ref={issueTypeRef}
            contentEditable={editCardActive}
            suppressContentEditableWarning
            className={cx(
              'text-sm font-normal text-slate-500',
              { 'text-slate-400': active },
              { 'cursor-pointer pr-2 text-green-600 focus-visible:outline-none': editCardActive && !active },
              { 'cursor-pointer pr-2 text-lime-400 focus-visible:outline-none': editCardActive && active },
            )}
          >
            {type}
          </CardTitle>
          <IssueCardMenu
            active={active}
            handleDeleteIssue={setOpenDeleteConfirmation}
            handleEditIssue={handleEditIssue}
          />
        </div>
        <CardDescription
          ref={issueTitleRef}
          contentEditable={editCardActive}
          suppressContentEditableWarning
          className={cx(
            '!mt-0 text-black text-md w-fit',
            { 'text-white': active },
            { 'cursor-pointer pr-2 text-green-600 focus-visible:outline-none': editCardActive && !active },
            { 'cursor-pointer pr-2 text-lime-400 focus-visible:outline-none': editCardActive && active },
          )}
        >
          {title}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full">
          <Button
            onClick={() => handleVoteIssue(issueId)}
            variant="default"
            className={cx('bg-slate-200 text-black hover:bg-slate-300', {
              'bg-slate-600 text-white hover:bg-slate-700 ring-1 ring-white ring-offset-slate-800 ring-offset-4 ':
                active,
            })}
          >
            {active ? 'Voting now ...' : 'Vote this issue'}
          </Button>

          <HoverCard
            trigger={
              <StoryPointsPopover
                issueId={issueId}
                value={estimatedPoints}
                className={cx({ 'bg-slate-600 text-white hover:bg-slate-700': active })}
                hideHoverContentOnOpen={setOpenPopover}
                open={!session?.admin.includes(user?.id.toString() ?? '') ? false : undefined}
              />
            }
            hoverContent={
              !popoverOpened && (
                <p className="text-sm text-white p-2 w-fit border-0 bg-slate-700 rounded-md">Select story points</p>
              )
            }
            delay={10}
            sideOffset={-5}
            align="end"
            alignOffset={-15}
            open={!session?.admin.includes(user?.id.toString() ?? '') ? false : undefined}
          />
        </div>
        {deleteConfirmationOpened && (
          <DeleteConfirmation
            issueId={issueId}
            active={active}
            handleCancelDelete={() => setOpenDeleteConfirmation(false)}
          />
        )}
        {editCardActive && (
          <EditConfirmation
            active={active}
            handleCancelEdit={handleCancelEditIssue}
            handleConfirmEdit={() => confirmEditIssue(issueId)}
          />
        )}
      </CardFooter>
    </Card>
  );
}
