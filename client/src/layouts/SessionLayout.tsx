import SessionHeader from '@/components/session/header/SessionHeader';
import Room from '@/components/session/room/Room';
import VotePanel from '@/components/session/vote/VotePanel';
import IssueBarProvider from '@/context/IssueBarProvider';

export default function SessionLayout() {
  return (
    <div className="flex flex-col w-screen h-dvh">
      <IssueBarProvider>
        <SessionHeader />
        <Room />
        <VotePanel />
      </IssueBarProvider>
    </div>
  );
}
