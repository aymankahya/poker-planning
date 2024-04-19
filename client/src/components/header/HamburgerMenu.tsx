import { navigationList } from '@/components/header/Navigation';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger className="min-[940px]:hidden" aria-label="menu">
        <MenuIcon className="mr-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-screen md:max-w-[100%] ">
        <SheetHeader>
          <h3 className="typography-h1 text-4xl mb-10 text-center">Menu</h3>
        </SheetHeader>
        {navigationList.map((item) => {
          return (
            <Link to="/" key={item.name}>
              <span
                role="link"
                aria-label="menu item"
                className="text-2xl border-0 font-thin hover:font-semibold transition-all ease-in-out block mb-6 text-center "
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
