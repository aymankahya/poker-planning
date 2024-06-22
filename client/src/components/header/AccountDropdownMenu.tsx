import AccountDropdownItem from '@/components/header/AccountDropdownItem';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks';
import useLogout from '@/hooks/useLogout';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React, { MouseEventHandler } from 'react';

type AccountActionsInterface = {
  name: string;
  icon: keyof typeof dynamicIconImports;
  seperator: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const accountActions: AccountActionsInterface[] = [
  { name: 'Settings', icon: 'settings', seperator: true },
  { name: 'Edit', icon: 'pencil', seperator: false },
  { name: 'Log out', icon: 'log-out', seperator: true },
];

export default function AccountDropdopwnMenu() {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger tabIndex={0} className="cursor-pointer " asChild>
        <Avatar>
          <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {accountActions.map((action) => {
          return (
            <React.Fragment key={action.name}>
              {action.seperator && <DropdownMenuSeparator />}
              {action.name === 'Log out' ? (
                <AccountDropdownItem action={action.name} iconName={action.icon} onClick={logout} />
              ) : (
                <AccountDropdownItem action={action.name} iconName={action.icon} />
              )}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
