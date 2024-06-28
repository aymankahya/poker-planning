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
        'flex justify-between items-center text-xs sticky inset-x-0 bottom-0 z-30 w-full px-5 py-2 lg:px-20 bg-transparent transition-all ',
        {
          'border-t border-slate-400  bg-white/30 backdrop-blur-lg transition-all': isScrolled,
        },
      )}
    >
      <div className="flex items-center">
        <Copyright className="h-4" />
        <a
          href="mailto:kahya.ayman@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          Ayman Kahya / Fullstack Developer
        </a>
      </div>
      <Button variant="ghost" className="flex gap-2" asChild>
        <a href="https://github.com/aymankahya/poker-planning/issues" target="_blank" rel="noreferrer">
          <Github />
          Submit an issue
        </a>
      </Button>
    </footer>
  );
}
