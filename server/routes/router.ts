import { Router } from 'express';
import { loginController, signupController } from '@/controllers';
import { validateUserLoginInfo } from '@/validation';
import { validateUserRegisterInfo } from '@/validation/userSignupValidation';

const router = Router();

router.post('/login', validateUserLoginInfo, loginController); // Handle user login requests
router.post('/sign-up', validateUserRegisterInfo, signupController); // Handle user registering requests

export default router;
