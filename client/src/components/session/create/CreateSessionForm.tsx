import CheckBoxFormField from '@/components/common/form/CheckBoxFormField';
import FormField from '@/components/common/form/FormField';
import ListFormField from '@/components/common/form/ListFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const VOTING_SYSTEM = [
  'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)',
  'Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)',
  'T-Shirt (XXS, XS, S, M, L, XL, XXL)',
];

const CreateSessionFormSchema = z.object({
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.string({ required_error: 'You must choose a voting system' }),
  adminAll: z.boolean().optional(),
});

type CreateSessionFormFields = z.infer<typeof CreateSessionFormSchema>;

export default function CreateSessionForm() {
  const form = useForm<CreateSessionFormFields>({
    resolver: zodResolver(CreateSessionFormSchema),
    defaultValues: {
      sessionName: '',
      adminAll: false,
    },
  });

  const onSubmit: SubmitHandler<CreateSessionFormFields> = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField name="sessionName" form={form} label="Session name" placeholder="Choose a name for this session" />
        <ListFormField
          name="voteSystem"
          form={form}
          label="Voting system"
          placeholder="Choose a voting system"
          list={VOTING_SYSTEM}
        />
        <CheckBoxFormField name="adminAll" form={form} label="Allow members to manage session" className="mt-5" />

        <Button type="submit" className="w-fit self-end">
          Create Session
        </Button>
      </form>
    </Form>
  );
}
