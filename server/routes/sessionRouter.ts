import { Router } from 'express';
import {
  createSessionController,
  getSessionDataController,
  joinSessionController,
  createNewIssue,
} from '@/controllers';
import { createNewIssueValidation, createSessionValidation, joinSessionValidation } from '@/validation';

const sessionRouter = Router();

sessionRouter.get('/session-data', getSessionDataController);
sessionRouter.post('/create-session', createSessionValidation, createSessionController);
sessionRouter.post('/join-session', joinSessionValidation, joinSessionController);
sessionRouter.post('/create-issue', createNewIssueValidation, createNewIssue);

export default sessionRouter;
