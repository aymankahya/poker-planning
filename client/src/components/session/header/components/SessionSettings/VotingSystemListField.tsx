import { Button } from '@/components/ui/button';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useNestedModalsUI from '@/hooks/useNestedModalsUI';
import useSettings from '@/hooks/useSettings';
import getVotingSystem from '@/utils/getVotingSystem';
import getVotingSystemLabels from '@/utils/getVotingSystemLabels';
import { cx } from 'class-variance-authority';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  placeholder?: string;
};

interface ListFormFieldProps<TFieldValues extends FieldValues> extends InputProps {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export default function VotingSystemListField<TFieldValues extends FieldValues = FieldValues>({
  name,
  form,
  label,
  placeholder,
}: ListFormFieldProps<TFieldValues>) {
  const [open, setOpen] = useState<boolean>(false);
  const { settings } = useSettings();
  const { hidden, setOpenCustomVoting, setHidden } = useNestedModalsUI();
  const votingSystemMap = getVotingSystem(settings?.customVotingSystem ?? []);
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                  {votingSystemMap.get(form.getValues(name))?.label ?? placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cx('w-full', { hidden })} align="start">
              <Command>
                <CommandList className="min-w-[26.8rem] ">
                  {getVotingSystemLabels(votingSystemMap).map((votingSystem) => {
                    return (
                      <CommandItem
                        key={votingSystem.id}
                        onSelect={() => {
                          // @ts-expect-error => Unknown type error : setValue should accept item as value normally
                          form.setValue(name, votingSystem?.id);
                          setOpen(false);
                        }}
                      >
                        {votingSystem.label}
                      </CommandItem>
                    );
                  })}
                  <CommandItem
                    className="font-bold cursor-pointer"
                    onSelect={() => {
                      setOpenCustomVoting(true);
                      setHidden(true);
                    }}
                  >
                    Create Custom Voting System
                  </CommandItem>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
