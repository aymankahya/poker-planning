import Icon from '@/components/common/Icon';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { MouseEventHandler } from 'react';

type AccountDropdownItemProp = {
  action: string;
  iconName: keyof typeof dynamicIconImports;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function AccountDropdownItem({ action, iconName, onClick }: AccountDropdownItemProp) {
  return (
    <DropdownMenuItem onClick={onClick}>
      <Icon name={iconName} style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
      <span>{action}</span>
    </DropdownMenuItem>
  );
}
