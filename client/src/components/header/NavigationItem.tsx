import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavigationItemProps = {
  children?: ReactNode;
  to?: string;
};

export default function NavigationItem({ children, to = '/' }: NavigationItemProps) {
  const location = useLocation();

  const linkStyle = cn(
    navigationMenuTriggerStyle(),
    'text-sm font-medium text-gray-600 transition-colors ease-out cursor-pointer bg-transparent hover:bg-transparent hover:text-black px-0 mr-8 focus:bg-transparent',
    {
      'focus:before:scale-x-100 focus:before:origin-left hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-black before:absolute before:left-0 before:bottom-1':
        location.pathname !== to,
    },
    {
      'font-bold text-black': location.pathname === to,
    },
  );

  return (
    <Link to={to} className={linkStyle} tabIndex={location.pathname === to ? -1 : 0}>
      {children}
    </Link>
  );
}
