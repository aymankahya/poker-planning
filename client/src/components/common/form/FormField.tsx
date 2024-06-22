import PasswordInput from '@/components/common/form/PasswordInput';
import {
  FormField as UiFormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  description?: string;
  placeholder?: string;
};

interface FormFieldProps<TFieldValues extends FieldValues> extends InputProps {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export default function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  form,
  description,
  label,
  placeholder,
}: FormFieldProps<TFieldValues>) {
  return (
    <UiFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {name === 'password' || name === 'confirmPassword' ? (
              <PasswordInput placeholder={placeholder} {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && <FormDescription className="text-xs pl-2">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
