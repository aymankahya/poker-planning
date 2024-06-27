import { User } from '@/components/header/components';
import { Button } from '@/components/ui/button';
import { useScroll, useAuth } from '@/hooks/';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';

function Header() {
  const { user } = useAuth();
  const { isScrolled } = useScroll(5);

  return (
    <header
      className={cn('sticky inset-x-0 top-0 z-30 w-full px-5 py-2 lg:px-20 bg-transparent transition-all ', {
        'border-b border-slate-400  bg-white/30 backdrop-blur-lg transition-all': isScrolled,
      })}
    >
      <div className="flex items-center justify-between max-w-screen-2xl m-auto">
        {/* <HamburgerMenu /> */}
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="" className="h-10" />
          <h3 className=" typography-h3 text-xl max-[385px]:hidden">Planning Poker</h3>
        </Link>
        {/* <Navigation /> */}
        <div className="flex gap-4">
          {!user && (
            <div className="flex gap-2">
              <Button asChild variant="link">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
          {user && <User />}
        </div>
      </div>
    </header>
  );
}

export default Header;
