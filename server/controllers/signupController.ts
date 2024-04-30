import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { capitalize } from 'lodash';
import { User } from '@/models/User';
import issueToken from '@/utils/issueToken';

const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length !== 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already linked to another account',
      });
    }
    hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return res.status(500).json({ sucess: false, error: 'Password hash creation failed' });

      const newUser = new User({
        firstName: capitalize(req.body.firstName),
        lastName: capitalize(req.body.lastName),
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();
      const jwtToken = issueToken(newUser, '2d');

      return res.status(200).json({
        success: true,
        username: newUser.username,
        token: jwtToken,
        msg: 'User created successfully',
      });
    });
  } catch (err) {
    next(err);
  }
};

export default signupController;
