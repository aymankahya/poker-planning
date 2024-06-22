import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useSession from '@/hooks/useSession';
import { cx } from 'class-variance-authority';

import { ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface ListFormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export default function AdminListField<TFieldValues extends FieldValues = FieldValues>({
  name,
  form,
}: ListFormFieldProps<TFieldValues>) {
  const { session } = useSession();
  const [adminUsers, setAdminUsers] = useState<string[] | 'All Players'>(session?.admin ?? []);
  const allPlayers = [...(session?.players ?? []), ...(session?.guests ?? [])];

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>Session Administrator</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" className="w-full justify-between hover:bg-transparent">
                  <div className="flex items-center gap-2">
                    {session?.settings.adminAll || adminUsers === 'All Players'
                      ? 'All Players'
                      : adminUsers.map((admin) => {
                          return (
                            <div key={admin} className="flex items-center gap-1 bg-slate-200 p-1 pl-2 rounded-md">
                              {allPlayers.find((player) => player.id === admin)?.username}
                              <X
                                className="p-1 w-5 h-5 rounded-full text-black hover:bg-red-500 hover:text-red-100 "
                                onClick={(e) => {
                                  e.preventDefault();
                                  setAdminUsers(adminUsers.filter((adminPerson) => adminPerson !== admin));
                                  form.setValue(
                                    name,
                                    form.getValues(name).filter((adminPerson: string) => adminPerson !== admin),
                                  );
                                }}
                              />
                            </div>
                          );
                        })}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full " align="start">
              <Command>
                <CommandList className="min-w-[26.8rem] ">
                  <CommandItem
                    key="all-players"
                    className={cx('flex gap-3 cursor-pointer mb-2', {
                      'text-slate-400 bg-gray-100': adminUsers === 'All Players',
                    })}
                    disabled={session?.settings.adminAll || adminUsers === 'All Players'}
                    onSelect={() => {
                      form.setValue(
                        name,
                        // @ts-expect-error => Unknown type error : setValue should accept item as value normally
                        allPlayers.map((player) => player.id),
                      );
                      return setAdminUsers('All Players');
                    }}
                  >
                    Make All Players Admins
                  </CommandItem>
                  {allPlayers.map((player) => {
                    return (
                      (!adminUsers.includes(player.id) || session?.settings.adminAll) && (
                        <CommandItem
                          key={player.id}
                          value={player.id}
                          className="flex gap-3 cursor-pointer"
                          onSelect={() => {
                            const admins = form.getValues(name);

                            if (adminUsers === 'All Players') {
                              // @ts-expect-error => Unknown type error : setValue should accept item as value normally
                              form.setValue(name, [player.id]);
                              return setAdminUsers([player.id]);
                            }
                            // @ts-expect-error => Unknown type error : setValue should accept item as value normally
                            form.setValue(name, [...admins, player.id]);
                            return setAdminUsers([...adminUsers, player.id]);
                          }}
                        >
                          <Avatar>
                            <AvatarFallback className="bg-slate-700 text-white">
                              {player.username.split(' ').at(0)?.charAt(0)}
                              {player.username.split(' ').at(1)?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {player.username}
                        </CommandItem>
                      )
                    );
                  })}
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
