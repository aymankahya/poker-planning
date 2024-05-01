import Background from '@/components/common/Background';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/layouts/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <Outlet />
      {/* Footer */}
      <Toaster />
      <Background />
    </main>
  );
}
