import { ArrowRight } from 'lucide-react';
import ReactWrapBalancer from 'react-wrap-balancer';
import Github from '@/components/common/icons/Github';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center gap-2 scroll-smooth mt-20 md:mt-40">
      <Button className="group flex gap-2 items-center text-zinc-300 text-sm w-fit px-5 py-1.5 rounded-full bg-black cursor-pointer hover:text-white hover:bg-black focus:text-white transition-all ease-in-out duration-300">
        <Github className="text-zinc-300 group-hover:text-white group-focus:text-white transition-all duration-300 ease-in-out" />
        See GitHub Repo{' '}
        <ArrowRight className="w-4 h-5 text-zinc-300 group-hover:translate-x-1 group-focus:translate-x-1 group-hover:text-white group-focus:text-white transition-all duration-300 ease-in-out" />
      </Button>
      <h1 className="typography-h1 m-5 text-center">
        <ReactWrapBalancer>Scrum Poker for Agile Projects</ReactWrapBalancer>
      </h1>
      <p className="typography-small max-w-xs leading-5 text-center md:max-w-fit">
        Empower your Agile team with Scrum Poker, a fun tool for better and precise project estimations
      </p>
      <div className="flex gap-5 mt-5 ">
        <Button className="bg-black hover:bg-black/90 transition-all ease-in-out duration-300">Create a session</Button>
        <Button className="bg-black hover:bg-black/90 transition-all ease-in-out duration-300">Join a session</Button>
      </div>
    </div>
  );
}
