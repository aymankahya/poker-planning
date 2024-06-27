import AccountDropdopwnMenu from '@/components/header/components/AccountDropdownMenu';
import { SessionInfo } from '@/components/session/header/components/';
import InvitePlayers from '@/components/session/header/components/InvitePlayers';
import SessionHamburgerMenu from '@/components/session/header/components/SessionSettings/SessionHamburgerMenu';
import IssueSideBar from '@/components/session/sidebar/IssueSideBar';
import { Separator } from '@/components/ui/separator';
import useIssueBar from '@/hooks/useIssueBar';
import { cx } from 'class-variance-authority';
import logo from '@/assets/logo.svg';

export default function SessionHeader() {
  const { issueBarContext } = useIssueBar();

  return (
    <div className="flex items-center justify-between px-5 py-2">
      <SessionHamburgerMenu />
      <div className="flex items-center">
        <img src={logo} alt="" className="h-10 max-[580px]:hidden" />
        <SessionInfo />
      </div>
      <div
        className={cx('flex items-center gap-5 transition-all duration-150', {
          'mr-[35rem] max-[1200px]:mr-[30rem] max-[1120px]:mr-0': issueBarContext.barOpened,
        })}
      >
        <InvitePlayers />
        <IssueSideBar />
        <Separator decorative orientation="vertical" className="h-8 bg-slate-300 max-[580px]:hidden" />
        <div className="max-[580px]:hidden">
          <AccountDropdopwnMenu />
        </div>
      </div>
    </div>
  );
}
