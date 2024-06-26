import { Toaster } from '@/components/ui/toaster';
import SessionProvider from '@/context/SessionProvider';
import SocketProvider from '@/context/SocketProvider';
import useSession from '@/hooks/useSession';
import Session from '@/pages/Session/Session';
import { cx } from 'class-variance-authority';

export default function SessionLayout() {
  const { dataLoading } = useSession();

  return (
    <div
      className={cx('flex flex-col w-screen h-dvh overflow-hidden', {
        'justify-center': dataLoading,
      })}
    >
      <SocketProvider>
        <SessionProvider>
          <Session />
          <Toaster />
        </SessionProvider>
      </SocketProvider>
    </div>
  );
}
