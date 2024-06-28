import InvitePlayersDialog from '@/components/session/header/components/InvitePlayersDialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks';
import useLogout from '@/hooks/useLogout';
import { Home, LogIn, LogOut, Menu, UserRoundPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function SessionHamburgerMenu() {
  const [invitePlayersOpen, setInvitePlayersOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { logout } = useLogout();
  return (
    <>
      <Sheet>
        <SheetTrigger className="min-[580px]:hidden" aria-label="menu">
          <Menu className="mr-5" />
        </SheetTrigger>
        <SheetContent side="left" className="max-[400px]:w-full">
          <SheetHeader className="flex flex-row items-center gap-3">
            <Avatar className="h-12 w-12 text-xl">
              <AvatarFallback>{user?.username[0]}</AvatarFallback>
            </Avatar>
            <h3 className="typography-h1 text-3xl !m-0">{user?.username}</h3>
          </SheetHeader>
          <SheetClose className="w-full my-5" asChild>
            <Button
              variant="outline"
              className="w-full flex items-center gap-4 text-md"
              onClick={() => setInvitePlayersOpen(true)}
            >
              <UserRoundPlus />
              Invite Players
            </Button>
          </SheetClose>
          <Separator className="mb-3" />
          {user?.role === 'guest' && (
            <div className="flex flex-col w-full gap-3">
              <Button
                variant="ghost"
                className="flex justify-start items-center p-0 gap-5 text-lg"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                <LogIn className="text-slate-700" />
                Login
              </Button>
              <Button
                variant="ghost"
                className="flex justify-start items-center p-0 gap-5 text-lg"
                onClick={() => {
                  window.location.href = '/sign-up';
                }}
              >
                <Users className="text-slate-700" />
                Sign up
              </Button>
              <Separator className="mb-3" />
            </div>
          )}
          <div className="flex flex-col w-full gap-3">
            <Button
              variant="ghost"
              className="w-full flex justify-start items-center p-0 gap-5 text-lg"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Home className="text-slate-700" />
              Go back to homepage
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-start items-center p-0 gap-5 text-lg"
              onClick={logout}
            >
              <LogOut className="text-slate-700" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <InvitePlayersDialog openDialog={invitePlayersOpen} setOpen={setInvitePlayersOpen} className="hidden" />
    </>
  );
}
