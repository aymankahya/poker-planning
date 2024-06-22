import { Router } from 'express';
import passport from 'passport';
import {
  authController,
  createGuestController,
  loginController,
  logoutController,
  signupController,
} from '@/controllers';
import { guestNameValidation, validateUserLoginInfo, validateUserRegisterInfo } from '@/validation';

const authRouter = Router();

authRouter.post('/login', validateUserLoginInfo, loginController); // Handle user login requests
authRouter.post('/sign-up', validateUserRegisterInfo, signupController); // Handle user registering requests
authRouter.post('/auth', passport.authenticate('jwt', { session: false }), authController);
authRouter.post('/logout', logoutController);
authRouter.post('/login-guest', guestNameValidation, createGuestController);

export default authRouter;
