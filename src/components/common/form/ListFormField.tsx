import { VOTING_SYSTEM } from '@/utils/constants/VOTING_SYSTEM';
import { Button } from '@/components/ui/button';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import {
  FormField as UiFormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  description?: string;
  placeholder: string;
  list: typeof VOTING_SYSTEM;
};

interface ListFormFieldProps<TFieldValues extends FieldValues> extends InputProps {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export default function List<TFieldValues extends FieldValues = FieldValues>({
  name,
  form,
  description,
  label,
  placeholder,
  list,
}: ListFormFieldProps<TFieldValues>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UiFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" className="w-full justify-between" aria-expanded={open}>
                  {field.value ? list.find((item) => item.id === field.value)?.label : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full " align="start">
              <Command>
                <CommandList className="w-full">
                  {list.map((item) => (
                    <CommandItem
                      className="cursor-pointer"
                      value={item.label}
                      key={item.label}
                      onSelect={() => {
                        // @ts-expect-error => Unknown type error : setValue should accept item as value normally
                        form.setValue(name, item.id);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', item === field.value ? 'opacity-100' : 'opacity-0')} />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
