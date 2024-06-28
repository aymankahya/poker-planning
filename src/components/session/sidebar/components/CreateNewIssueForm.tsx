import { FormField } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useCreateNewIssue from '@/hooks/useCreateNewIssue';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateNewIssueFormProps = {
  hideForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const IssueFormSchema = z.object({
  type: z.string(),
  title: z.string(),
});

type IssueFormSchemaFields = z.infer<typeof IssueFormSchema>;

export default function CreateNewIssueForm({ hideForm }: CreateNewIssueFormProps) {
  const { loading, createNewIssue } = useCreateNewIssue();
  const form = useForm<IssueFormSchemaFields>({
    resolver: zodResolver(IssueFormSchema),
    defaultValues: {
      type: '',
      title: '',
    },
  });

  const onSubmit: SubmitHandler<IssueFormSchemaFields> = (data) => {
    createNewIssue(data);
    form.reset();
    hideForm(false);
  };

  const handleFormCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    hideForm(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 bg-slate-100 p-3 rounded-lg mb-5">
        <FormField name="type" form={form} label="Issue type" placeholder="Enter the issue type (User Story, Bug...)" />
        <FormField name="title" form={form} label="Title" placeholder="Enter the issue title" />
        <div className="flex gap-5 my-2">
          <Button
            variant="outline"
            onClick={(e) => handleFormCancel(e)}
            className="w-full rounded-full bg-transparent hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button className="w-full rounded-full" disabled={loading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
