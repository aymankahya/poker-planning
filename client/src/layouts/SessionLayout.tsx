import SessionProvider from '@/context/SessionProvider';
import useSession from '@/hooks/useSession';
import Session from '@/pages/Session';
import { cx } from 'class-variance-authority';

export default function SessionLayout() {
  const { dataLoading } = useSession();
  return (
    <div className={cx('flex flex-col w-screen h-dvh', { 'justify-center': dataLoading })}>
      <SessionProvider>
        <Session />
      </SessionProvider>
    </div>
  );
}
