import Github from '@/components/common/icons/Github';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks';
import { cn } from '@/lib/utils';
import { Copyright } from 'lucide-react';

export default function Footer() {
  const { isScrolled } = useScroll(5);
  return (
    <footer
      className={cn(
        'flex flex-col gap-1 justify-between  text-xs sticky inset-x-0 bottom-0 z-30 w-full px-5 py-2 lg:px-20 bg-transparent transition-all min-[500px]:flex-row min-[500px]:items-center',
        {
          'border-t border-slate-400  bg-white/30 backdrop-blur-lg transition-all': isScrolled,
        },
      )}
    >
      <div className="flex items-start text-[10px] max-[506px]items-center  min-[400px]:text-xs">
        <Copyright className="h-4" />
        <a
          href="mailto:kahya.ayman@gmail.com"
          target="_blank"
          rel="noreferrer"
          className=" hover:underline hover:underline-offset-4"
        >
          Ayman Kahya / Fullstack Developer
        </a>
      </div>
      <Button
        variant="ghost"
        className="flex w-fit text-[10px] min-[400px]:text-xs justify-start pl-1 gap-2 min-[500px]:justify-center min-[500px]:text-sm min-[500px]:px-4"
        asChild
      >
        <a href="https://github.com/aymankahya/poker-planning/issues" target="_blank" rel="noreferrer">
          <Github />
          Submit an issue
        </a>
      </Button>
    </footer>
  );
}
