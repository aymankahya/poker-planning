import { Router } from 'express';
import { createSessionController, getSessionData } from '@/controllers';
import { createSessionValidation } from '@/validation';

const sessionRouter = Router();

sessionRouter.get('/session-data', getSessionData);
sessionRouter.post('/create-session', createSessionValidation, createSessionController);

export default sessionRouter;
