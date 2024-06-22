import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks';
import { FormField } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useJoinSession from '@/hooks/useJoinSession';

const JoinSessionGuestFormSchema = z.object({
  guestName: z.string().min(3, { message: 'Player name must be at least 3 characters long' }),
  sessionId: z.string().regex(/[a-fA-F0-9]{24}/, { message: 'Not a valid session ID' }),
});

const JoinSessionAuthUserFormSchema = z.object({
  sessionId: z.string().regex(/[a-fA-F0-9]{24}/, { message: 'Not a valid session ID' }),
});

type JoinSessionFormFields = z.infer<typeof JoinSessionAuthUserFormSchema> | z.infer<typeof JoinSessionGuestFormSchema>;

export default function JoinSessionForm() {
  const { user, isAuth } = useAuth();
  const { joinSession, loading } = useJoinSession();
  const JoinSessionFormSchema = isAuth ? JoinSessionAuthUserFormSchema : JoinSessionGuestFormSchema;

  const defaultValues = isAuth ? { sessionId: '' } : { guestName: '', sessionId: '' };

  const form = useForm<JoinSessionFormFields>({
    resolver: zodResolver(JoinSessionFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<JoinSessionFormFields> = (data) => {
    joinSession({ ...data, id: user?.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {!isAuth && user?.role !== 'guest' && (
          <FormField name="guestName" form={form} label="Display name" placeholder="Choose a display name" />
        )}
        <FormField name="sessionId" form={form} label="Session ID" placeholder="Enter the ID of the session to join" />
        <Button type="submit" disabled={loading} className="w-fit self-end">
          Join Session
        </Button>
      </form>
    </Form>
  );
}
