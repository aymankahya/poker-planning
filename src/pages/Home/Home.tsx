import { CreateSession, JoinSession } from '@/components/session';
import Github from '@/components/common/icons/Github';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import NestedModalsUIProvider from '@/context/NestedModalsUIProvider';
import CreateCustomVotingSystem from '@/components/session/create/CustomVotingSystem/CreateCustomVotingSystem';

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center gap-2 h-dvh justify-center -mt-17 md:-mt-32 ">
      <Button className="group flex gap-2 items-center text-zinc-300 text-sm w-fit px-5 py-1.5 rounded-full bg-black cursor-pointer hover:text-white hover:bg-black focus:text-white transition-all ease-in-out duration-300">
        <Github className="text-zinc-300 group-hover:text-white group-focus:text-white transition-all duration-300 ease-in-out" />
        See GitHub Repo{' '}
        <ArrowRight className="w-4 h-5 text-zinc-300 group-hover:translate-x-1 group-focus:translate-x-1 group-hover:text-white group-focus:text-white transition-all duration-300 ease-in-out" />
      </Button>
      <div className="flex flex-col gap-3 items-center max-[780px]:max-w-[40rem] mt-5 px-5">
        <h1 className="text-4xl font-extrabold min-[355px]:text-5xl min-[570px]:text-5xl min-[785px]:text-7xl text-center">
          Poker for Agile Projects
        </h1>
        <p className="max-[355px]:text-sm text-md font-extralight md:!leading-9 text-center max-w-[35ch] min-[570px]:max-w-[50ch] min-[785px]:max-w-[80ch]">
          {' '}
          A free, open-source web app for Agile/Scrum teams to efficiently estimate user stories using fun, precise
          Scrum Poker. Enhance project planning with consensus-based, gamified estimations.
        </p>
      </div>
      <div className="flex gap-4 md:gap-7 mt-5 px-8 flex-col w-full md:flex-row md:justify-center">
        <NestedModalsUIProvider>
          <CreateSession />
          <CreateCustomVotingSystem />
        </NestedModalsUIProvider>
        <JoinSession />
      </div>
    </div>
  );
}
