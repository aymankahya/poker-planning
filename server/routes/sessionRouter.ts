import { Router } from 'express';
import {
  createSessionController,
  getSessionDataController,
  joinSessionController,
  createNewIssue,
  createCustomValidationController,
  updateSessionSettingsController,
} from '@/controllers';
import {
  createCustomVotingValidation,
  createNewIssueValidation,
  createSessionValidation,
  joinSessionValidation,
  updateSessionSettingsValidation,
} from '@/validation';

const sessionRouter = Router();

sessionRouter.get('/session-data', getSessionDataController);
sessionRouter.post('/create-session', createSessionValidation, createSessionController);
sessionRouter.post('/join-session', joinSessionValidation, joinSessionController);
sessionRouter.post('/create-issue', createNewIssueValidation, createNewIssue);
sessionRouter.post('/create-custom-voting', createCustomVotingValidation, createCustomValidationController);
sessionRouter.post('/update-session-settings', updateSessionSettingsValidation, updateSessionSettingsController);

export default sessionRouter;
