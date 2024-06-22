import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useSession from '@/hooks/useSession';

import { ChevronDown, Home, LucideProps, Settings } from 'lucide-react';
import React from 'react';

const sessionControls = [
  { title: 'Session settings', icon: (props: Omit<LucideProps, 'ref'>) => <Settings {...props} /> },
  { title: 'Go to homepage', icon: (props: Omit<LucideProps, 'ref'>) => <Home {...props} /> },
];

export default function SessionControl() {
  const { session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group flex items-center gap-2">
        <Button variant="ghost" className="text-xl text-black font-bold hover:text-black hover:bg-slate-100">
          {session?.sessionName}
          <ChevronDown className="w-5 h-5 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {sessionControls.map((control, index) => {
          return (
            <React.Fragment key={control.title}>
              <DropdownMenuItem>
                <span aria-hidden className="mr-2 h-4 w-4">
                  {control.icon({ className: 'mr-2 h-4 w-4' })}
                </span>
                {control.title}
              </DropdownMenuItem>
              {index !== sessionControls.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
