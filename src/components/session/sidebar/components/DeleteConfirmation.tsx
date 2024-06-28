import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useDeleteIssue from '@/hooks/useDeleteIssue';
import { cx } from 'class-variance-authority';

type DeleteConfirmationProps = {
  issueId: string;
  handleCancelDelete: () => void;
  active: boolean;
};

export default function DeleteConfirmation({ issueId, handleCancelDelete, active = false }: DeleteConfirmationProps) {
  const { handleDeleteIssue } = useDeleteIssue();
  return (
    <div className="flex flex-col w-full mt-5">
      <Separator />
      <p className={cx('text-sm font-bold mt-5', { 'text-white font-medium': active })}>
        Are you sure you want to delete this issue ?{' '}
      </p>
      <div className="flex items-center gap-5 mt-2">
        <Button
          variant="outline"
          className={cx('w-full bg-transparent hover:bg-slate-200', { 'text-white': active })}
          onClick={handleCancelDelete}
        >
          Cancel
        </Button>
        <Button variant="destructive" className="w-full" onClick={() => handleDeleteIssue(issueId)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
