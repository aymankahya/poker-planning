import { Router } from 'express';
import passport from 'passport';
import { authController, loginController, logoutController, signupController } from '@/controllers';
import { validateUserLoginInfo, validateUserRegisterInfo } from '@/validation';

const router = Router();

router.post('/login', validateUserLoginInfo, loginController); // Handle user login requests
router.post('/sign-up', validateUserRegisterInfo, signupController); // Handle user registering requests
router.post('/auth', passport.authenticate('jwt', { session: false }), authController);
router.post('/logout', logoutController);
export default router;
