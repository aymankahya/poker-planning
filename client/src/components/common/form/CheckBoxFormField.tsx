import { Checkbox } from '@/components/ui/checkbox';
import { FormField as UiFormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  className?: string;
};

interface CheckBoxFormFieldProps<TFieldValues extends FieldValues> extends InputProps {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export default function CheckBoxFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  form,
  label,
  className,
}: CheckBoxFormFieldProps<TFieldValues>) {
  return (
    <UiFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex items-center gap-2', className)}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="!m-0">{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
