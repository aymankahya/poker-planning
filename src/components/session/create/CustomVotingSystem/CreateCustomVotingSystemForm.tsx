import { FormField } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks';
import useCreateCustomVotingSystem from '@/hooks/useCreateCustomVotingSystem';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const CustomVotingSystemFormSchema = z.object({
  label: z.string().min(3, { message: 'Voting System Label must be at least 3 characters long' }),
  values: z.string().regex(/^([^,]+,)+[^,]+$/, { message: 'The values provided should be seperated by commas' }),
});

type CustomVotingSystemFormFields = z.infer<typeof CustomVotingSystemFormSchema>;

export default function CreateCustomVotingSystemForm({
  closeDialog,
}: {
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { createCustomVotingSystem, loading } = useCreateCustomVotingSystem();
  const { user } = useAuth();
  const form = useForm<CustomVotingSystemFormFields>({
    resolver: zodResolver(CustomVotingSystemFormSchema),
    defaultValues: {
      label: '',
      values: '',
    },
  });

  const onSubmit: SubmitHandler<CustomVotingSystemFormFields> = async (data) => {
    const success = createCustomVotingSystem(user?.id.toString() ?? '', data.label, data.values);
    if (await success) closeDialog(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          name="label"
          form={form}
          label="Voting System Label"
          placeholder="Enter the name of your custom voting system"
        />
        <FormField
          name="values"
          form={form}
          label="Voting System Values"
          placeholder="Enter the values of your custom voting system"
          description="Enter values seperated by commas (Example: 1,2,3,5,6,7)"
        />
        <Button disabled={loading} className="mt-3" type="submit">
          Create Custom Voting System
        </Button>
      </form>
    </Form>
  );
}
