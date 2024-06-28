import Background from '@/components/common/Background';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center h-screen max-[350px]:gap-16 ">
      <h3 className=" typography-h1 z-40 absolute top-[10%] max-[350px]:static ">
        <Link to="/">Poker Planning</Link>
      </h3>
      {children}
      <Background />
      <Toaster />
    </div>
  );
}
