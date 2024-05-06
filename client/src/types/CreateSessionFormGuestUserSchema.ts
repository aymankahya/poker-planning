import { z } from 'zod';

export const CreateSessionFormGuestUserSchema = z.object({
  guestName: z.string().min(3, { message: 'Player name must be at least 3 characters long' }),
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.number({ required_error: 'You must choose a voting system' }),
  adminAll: z.boolean().optional(),
});
