import AccountDropdownItem from '@/components/header/AccountDropdownItem';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';

type AccountActionsInterface = {
  name: string;
  icon: keyof typeof dynamicIconImports;
  seperator: boolean;
};

const accountActions: AccountActionsInterface[] = [
  { name: 'Settings', icon: 'settings', seperator: true },
  { name: 'Edit', icon: 'pencil', seperator: false },
  { name: 'Log out', icon: 'log-out', seperator: true },
];

export default function AccountDropdopwnMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger tabIndex={0} className="cursor-pointer " asChild>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {accountActions.map((action) => {
          return (
            <React.Fragment key={action.name}>
              {action.seperator && <DropdownMenuSeparator />}
              <AccountDropdownItem action={action.name} iconName={action.icon} />
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
