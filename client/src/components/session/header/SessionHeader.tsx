import { SessionInfo, SessionPlayer } from '@/components/session/header/components/';
import InvitePlayers from '@/components/session/header/components/InvitePlayers';
import IssueSideBar from '@/components/session/sidebar/IssueSideBar';
import { Separator } from '@/components/ui/separator';
import useIssueBar from '@/hooks/useIssueBar';
import { cx } from 'class-variance-authority';

export default function SessionHeader() {
  const { issueBarContext } = useIssueBar();
  return (
    <div className="flex items-center justify-between px-5 py-2 ">
      <SessionInfo />
      <div
        className={cx('flex items-center gap-5 transition-all duration-150', {
          'mr-[35rem]': issueBarContext.barOpened,
        })}
      >
        <InvitePlayers />
        <IssueSideBar />
        <Separator decorative orientation="vertical" className="h-8 bg-slate-300" />
        <SessionPlayer />
      </div>
    </div>
  );
}
