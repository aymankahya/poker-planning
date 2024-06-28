import { FormField } from '@/components/common/form';
import AdminListField from '@/components/session/header/components/SessionSettings/AdminListField';
import VotingSystemListField from '@/components/session/header/components/SessionSettings/VotingSystemListField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useSession from '@/hooks/useSession';
import useSettings from '@/hooks/useSettings';
import useSocket from '@/hooks/useSocket';
import useUpdateSessionSettings from '@/hooks/useUpdateSessionSettings';
import { getRoomIDFromUrl } from '@/utils';
import getVotingSystem from '@/utils/getVotingSystem';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

const SessionSettingsFormSchema = z.object({
  sessionAdmin: z.string().array().nonempty({ message: 'You must assign at least one session administrator ' }),
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.number({ required_error: 'You must choose a voting system' }),
});

type SessionSettingsFormFields = z.infer<typeof SessionSettingsFormSchema>;

export default function SessionSettingsForm({
  closeSettings,
}: {
  closeSettings: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { session } = useSession();
  const { settings } = useSettings();
  const { socket } = useSocket();
  const location = useLocation();
  const { updateSessionSettings, loading } = useUpdateSessionSettings();
  const votingSystemMap = getVotingSystem(settings?.customVotingSystem ?? []);
  const activeVotingSystemId =
    [...votingSystemMap.entries()].find(
      (votingSystem) => votingSystem[1].values.toString() === session?.settings.votingSystem.toString(),
    ) ?? [];

  const form = useForm<SessionSettingsFormFields>({
    resolver: zodResolver(SessionSettingsFormSchema),
    defaultValues: {
      sessionAdmin: session?.admin ?? [],
      sessionName: session?.sessionName,
      voteSystem: activeVotingSystemId[0],
    },
  });

  const onsubmit: SubmitHandler<SessionSettingsFormFields> = async (data) => {
    const success = updateSessionSettings(
      data.sessionName,
      data.sessionAdmin,
      votingSystemMap.get(data.voteSystem)?.values ?? [],
    );
    if (await success) {
      closeSettings(false);
      socket?.emit('update-all-session', getRoomIDFromUrl(location.pathname));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <FormField name="sessionName" form={form} label="Session Name" />
        <AdminListField name="sessionAdmin" form={form} />
        <VotingSystemListField name="voteSystem" form={form} label="Session Administrator" />
        <Button disabled={loading} type="submit">
          Update Session Settings
        </Button>
      </form>
    </Form>
  );
}
