import { Router } from 'express';
import { createSessionController, getSessionData, joinSessionController } from '@/controllers';
import { createSessionValidation, joinSessionValidation } from '@/validation';

const sessionRouter = Router();

sessionRouter.get('/session-data', getSessionData);
sessionRouter.post('/create-session', createSessionValidation, createSessionController);
sessionRouter.post('/join-session', joinSessionValidation, joinSessionController);

export default sessionRouter;
