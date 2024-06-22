import SessionHeader from '@/components/session/header/SessionHeader';
import Room from '@/components/session/room/Room';
import VotePanel from '@/components/session/vote/VotePanel';
import { Spinner } from '@/components/ui/spinner';
import IssueBarProvider from '@/context/IssueBarProvider';
import { useUpdateSession } from '@/hooks';
import useSession from '@/hooks/useSession';
import useSocket from '@/hooks/useSocket';

export default function Session() {
  const { dataLoading } = useSession();
  const { socket } = useSocket();
  const { updateSession } = useUpdateSession();

  socket?.on('update-session', updateSession);

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
