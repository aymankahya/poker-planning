import Background from '@/components/common/Background';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { CircleArrowLeft } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h3 className=" typography-h1 z-40 absolute top-[10%] max-[350px]:static [@media(max-height:800px)]:hidden">
        <Link to="/">Poker Planning</Link>
      </h3>
      <Button asChild variant="ghost" className="hidden gap-1 mb-3 z-30  [@media(max-height:800px)]:flex">
        <Link to="/">
          <CircleArrowLeft />
          Go to homepage
        </Link>
      </Button>
      {children}
      <Background />
      <Toaster />
    </div>
  );
}
