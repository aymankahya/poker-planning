import { cx } from 'class-variance-authority';
import { Check } from 'lucide-react';

type PlayerCardProps = {
  className?: string;
  visible: boolean;
  score: string;
  hasVoted: boolean;
};

export default function PlayerCard({ className, visible = false, score = '', hasVoted = true }: PlayerCardProps) {
  return (
    <div className="relative">
      {/* Front Card */}
      <div
        className={cx(
          'absolute z-30 w-[40px] min-h-[70px] flex items-center justify-center bg-gray-200 hover:bg-gray-200 rounded-lg [transition:transform_300ms,shadow_0s] ease-linear cursor-pointer [backface-visibility:hidden]',
          { '[transform:rotateY(180deg)]': visible },
          { 'shadow-[rgba(101,_163,_13,_0.8)_0px_3px_8px] duration-0': hasVoted },
          className,
        )}
      >
        {hasVoted && <Check className="w-7 h-7 text-lime-600 stroke-[2.5px]" />}
      </div>

      {/* Back Card */}
      <div
        className={cx(
          'w-[40px] min-h-[70px] text-sky-800 font-bold  rounded-lg flex items-center justify-center text-lg transition-transform ease-linear duration-300 cursor-pointer shadow-[rgba(7,_89,_133,_0.8)_0px_3px_8px] [transform:rotateY(-180deg)] [backface-visibility:hidden]',
          { '[transform:rotateY(0deg)] ': visible },
          className,
        )}
      >
        {score}
      </div>
    </div>
  );
}
