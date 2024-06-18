import { z } from 'zod';

const IssueFormSchema = z.object({
  type: z.string(),
  title: z.string(),
});

export type CreateNewIssueFormFields = z.infer<typeof IssueFormSchema>;
