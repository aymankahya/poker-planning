import Background from '@/components/common/Background';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/footer/Footer';

export default function Layout() {
  return (
    <main className="flex flex-col items-center justify-between h-dvh">
      <Header />
      <Outlet />
      <Toaster />
      <Background />
      <Footer />
    </main>
  );
}
