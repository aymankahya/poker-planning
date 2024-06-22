import SessionHeader from '@/components/session/header/SessionHeader';
import Room from '@/components/session/room/Room';
import VotePanel from '@/components/session/vote/VotePanel';
import { Spinner } from '@/components/ui/spinner';
import IssueBarProvider from '@/context/IssueBarProvider';
import useSession from '@/hooks/useSession';

export default function Session() {
  const { dataLoading } = useSession();
  return dataLoading ? (
    <Spinner size="large" />
  ) : (
    <IssueBarProvider>
      <SessionHeader />
      <Room />
      <VotePanel />
    </IssueBarProvider>
  );
}
