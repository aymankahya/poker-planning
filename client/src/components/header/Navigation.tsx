import NavigationItem from '@/components/header/NavigationItem';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { pathConstants as paths } from '@/routes/pathConstants';

export const navigationList = [
  { name: 'What is Poker Planning ?', path: paths.ABOUT },
  { name: 'Features', path: paths.FEATURES },
  { name: 'Changelog', path: paths.CHANGELOG },
];

export default function Navigation() {
  return (
    <NavigationMenu className="hidden min-[940px]:inline">
      <NavigationMenuList>
        <NavigationMenuItem>
          {navigationList.map((item) => {
            return (
              <NavigationItem key={item.name} to={item.path}>
                {item.name}
              </NavigationItem>
            );
          })}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
