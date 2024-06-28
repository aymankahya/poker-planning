import { Button } from '@/components/ui/button';
import { cx } from 'class-variance-authority';

type EditConfirmationProps = {
  active: boolean;
  handleConfirmEdit: () => void;
  handleCancelEdit: () => void;
};

export default function EditConfirmation({
  handleConfirmEdit,
  handleCancelEdit,
  active = false,
}: EditConfirmationProps) {
  return (
    <div className="flex flex-col w-full mt-5">
      <div className="flex items-center gap-5 mt-2">
        <Button
          variant="outline"
          className={cx('w-full bg-transparent hover:bg-slate-200', { 'text-white': active })}
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
        <Button variant="destructive" className="w-full bg-slate-600 hover:bg-slate-700" onClick={handleConfirmEdit}>
          Save
        </Button>
      </div>
    </div>
  );
}
