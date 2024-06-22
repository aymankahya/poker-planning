import { z } from 'zod';

export const CreateSessionFormAuthUserSchema = z.object({
  sessionName: z.string().min(3, { message: 'Session name must be at least 3 characters long' }),
  voteSystem: z.number({ required_error: 'You must choose a voting system' }),
  adminAll: z.boolean().optional(),
});
