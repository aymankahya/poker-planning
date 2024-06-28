import { z } from 'zod';

const JoinSessionGuestFormSchema = z.object({
  guestName: z.string().min(3, { message: 'Player name must be at least 3 characters long' }),
  sessionId: z.string().regex(/[a-fA-F0-9]{24}/, { message: 'Not a valid session ID' }),
});

const JoinSessionAuthUserFormSchema = z.object({
  sessionId: z.string().regex(/[a-fA-F0-9]{24}/, { message: 'Not a valid session ID' }),
});

export type JoinSessionFormFields =
  | z.infer<typeof JoinSessionAuthUserFormSchema>
  | z.infer<typeof JoinSessionGuestFormSchema>;
