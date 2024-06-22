import SessionControl from '@/components/session/header/components/SessionControl';

export default function SessionInfo() {
  return (
    <div className="flex flex-col items-start justify-center h-[4rem]">
      <SessionControl />
      <span aria-live="polite" className="text-slate-500 ml-[16px]">
        Voting : <span className="font-bold italic">Name</span>{' '}
      </span>
    </div>
  );
}
