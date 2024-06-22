import Icon from '@/components/common/Icon';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type AccountDropdownItemProp = {
  action: string;
  iconName: keyof typeof dynamicIconImports;
};

export default function AccountDropdownItem({ action, iconName }: AccountDropdownItemProp) {
  return (
    <DropdownMenuItem>
      <Icon name={iconName} style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
      <span>{action}</span>
    </DropdownMenuItem>
  );
}
