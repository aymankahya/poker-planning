import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    const [showPass, setShowPass] = React.useState<boolean>(false);
    const styleIcon = cn(
      'w-8 h-8 text-slate-400 stroke-[1.5px] hover:text-black transition-all ease-in-out duration-300 cursor-pointer',
    );
    return (
      <Input
        type={showPass ? 'text' : 'password'}
        placeholder={placeholder}
        icon={
          showPass ? (
            <EyeOff
              tabIndex={0}
              role="button"
              aria-label="Hide password"
              onClick={() => setShowPass((prev) => !prev)}
              onKeyDown={(e) => e.code === 'Enter' && setShowPass((prev) => !prev)}
              className={styleIcon}
            />
          ) : (
            <Eye
              tabIndex={0}
              role="button"
              aria-label="Show password"
              onClick={() => setShowPass((prev) => !prev)}
              onKeyDown={(e) => e.code === 'Enter' && setShowPass((prev) => !prev)}
              className={styleIcon}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
