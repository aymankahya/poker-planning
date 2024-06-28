import CreateCustomVotingSystem from '@/components/session/create/CustomVotingSystem/CreateCustomVotingSystem';
import { SessionSettings } from '@/components/session/header/components/SessionSettings/';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import NestedModalsUIProvider from '@/context/NestedModalsUIProvider';
import { useAuth } from '@/hooks';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';
import { ChevronDown, Home, LucideProps, Settings } from 'lucide-react';
import React, { useState } from 'react';

export default function SessionControl() {
  const { session } = useSession();
  const { user } = useAuth();
  const { toast } = useToast();
  const [settingsOpen, setOpenSettings] = useState<boolean>(false);

  const sessionControls = [
    {
      title: 'Session settings',
      icon: (props: Omit<LucideProps, 'ref'>) => <Settings {...props} />,
      handleClick: () => {
        if (!session?.admin.includes(user?.id.toString() ?? '')) {
          return toast({
            title: "You don't have permission to manage session settings",
            description: 'Request to be added as administrator by the session facilator',
            variant: 'destructive',
          });
        }
        return setOpenSettings(true);
      },
    },
    {
      title: 'Go to homepage',
      icon: (props: Omit<LucideProps, 'ref'>) => <Home {...props} />,
      handleClick: () => {
        window.location.href = '/';
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group flex items-center gap-2 ">
        <Button
          variant="ghost"
          className="text-xl text-black font-bold hover:text-black hover:bg-slate-100 max-[355px]:h-[2rem]"
        >
          <p className="max-[580px]:max-w-[15ch] max-[580px]:text-ellipsis max-[580px]:overflow-hidden max-[355px]:text-[16px] ">
            {session?.sessionName}
          </p>
          <ChevronDown className="w-5 h-5 transition duration-200 group-data-[state=open]:rotate-180 max-[580px]:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <NestedModalsUIProvider>
        <SessionSettings openState={settingsOpen} setOpenSettings={setOpenSettings} />
        <CreateCustomVotingSystem />
      </NestedModalsUIProvider>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {sessionControls.map((control, index) => {
          return (
            <React.Fragment key={control.title}>
              <DropdownMenuItem
                onClick={control.handleClick}
                className={cx({ 'max-[580px]:hidden': control.title === 'Go to homepage' })}
              >
                <span aria-hidden className="mr-2 h-4 w-4">
                  {control.icon({ className: 'mr-2 h-4 w-4' })}
                </span>
                {control.title}
              </DropdownMenuItem>
              {index !== sessionControls.length - 1 && <DropdownMenuSeparator className="max-[580px]:hidden" />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
