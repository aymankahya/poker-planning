import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';
import { Trash2, Edit, EllipsisVertical } from 'lucide-react';

type IssueCardMenuProps = {
  handleEditIssue: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteIssue: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
};

const issueCardMenuContent = [
  { label: 'Edit', icon: (className: string) => <Edit className={className} /> },
  {
    label: 'Delete',
    icon: (className: string) => <Trash2 className={className} />,
  },
];

export default function IssueCardMenu({ handleEditIssue, handleDeleteIssue, active = false }: IssueCardMenuProps) {
  const { session } = useSession();
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cx({
          'pointer-events-none opacity-0': !session?.admin.includes(user?.id.toString() ?? ''),
        })}
      >
        <EllipsisVertical
          className={cx(
            'w-5 h-5 rounded-full p-2 box-content hover:bg-slate-200 transition-all ease-out duration-200 cursor-pointer',
            { 'text-white hover:bg-slate-600': active },
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px]" side="bottom" align="end" alignOffset={15}>
        {issueCardMenuContent.map((content) => {
          return content?.label === 'Delete' ? (
            <DropdownMenuItem
              key={content.label}
              className="flex items-center gap-3"
              onClick={() => handleDeleteIssue(true)}
            >
              {content.icon('h-5 w-5')}
              <span className="text-md">{content.label}</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={content.label}
              className="flex items-center gap-3"
              onClick={() => handleEditIssue(true)}
            >
              {content.icon('h-5 w-5')}
              <span className="text-md">{content.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
