import { FormField, CheckBoxFormField } from '@/components/common/form/';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth, useCreateSession } from '@/hooks';
import { z } from 'zod';
import useCheckAuth from '@/hooks/useCheckAuth';
import useSettings from '@/hooks/useSettings';
import getVotingSystem from '@/utils/getVotingSystem';
import VotingSystemListField from '@/components/session/header/components/SessionSettings/VotingSystemListField';

const CreateSessionFormGuestUserSchema = z.object({
  guestName: z.string().min(3, { message: 'Player name must be at least 3 characters long' }),
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.number({ required_error: 'You must choose a voting system' }),
  adminAll: z.boolean().optional(),
});

const CreateSessionFormAuthUserSchema = z.object({
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.number({ required_error: 'You must choose a voting system' }),
  adminAll: z.boolean().optional(),
});

type CreateSessionFormFields =
  | z.infer<typeof CreateSessionFormAuthUserSchema>
  | z.infer<typeof CreateSessionFormGuestUserSchema>;

export default function CreateSessionForm() {
  const { createSession, loading } = useCreateSession();
  const { isAuth } = useCheckAuth();
  const { user } = useAuth();
  const { settings } = useSettings();
  const CreateSessionFormSchema = isAuth ? CreateSessionFormAuthUserSchema : CreateSessionFormGuestUserSchema;
  const votingSystemMap = getVotingSystem(settings?.customVotingSystem ?? []);

  const defaultValues = isAuth
    ? {
        sessionName: '',
        adminAll: false,
      }
    : {
        guestName: '',
        sessionName: '',
        adminAll: false,
      };

  const form = useForm<CreateSessionFormFields>({
    resolver: zodResolver(CreateSessionFormSchema),
    // eslint-disable-next-line
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<CreateSessionFormFields> = (data) => {
    if (user?.role === 'guest') {
      createSession({
        ...data,
        votingSystem: votingSystemMap.get(data.voteSystem)?.values ?? [],
        guestId: user?.id,
      });
    } else if (user?.role === 'user') {
      createSession({ ...data, votingSystem: votingSystemMap.get(data.voteSystem)?.values ?? [], id: user?.id });
    } else {
      createSession({ ...data, votingSystem: votingSystemMap.get(data.voteSystem)?.values ?? [] });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {!isAuth && <FormField name="guestName" form={form} label="Display name" placeholder="Choose a display name" />}
        <FormField name="sessionName" form={form} label="Session name" placeholder="Choose a name for this session" />
        {/* <ListFormField
          name="voteSystem"
          form={form}
          label="Voting system"
          placeholder="Choose a voting system"
          list={getVotingSystemLabels(votingSystemMap)}
        /> */}
        <VotingSystemListField
          name="voteSystem"
          form={form}
          label="Voting system"
          placeholder="Choose a voting system"
        />
        <CheckBoxFormField name="adminAll" form={form} label="Allow members to manage session" className="mt-5" />

        <Button type="submit" disabled={loading} className="w-fit self-end">
          Create Session
        </Button>
      </form>
    </Form>
  );
}
