import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';
import issueToken from '@/utils/issueToken';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(404).json({ success: false, error: 'No user found' });
    const match = await compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ success: false, error: 'Wrong password' });
    const jwtToken = issueToken(user, '2d');
    return res.status(200).json({
      success: true,
      user: { id: user._id, username: user.username },
      token: jwtToken,
    });
  } catch (err) {
    return next(err);
  }
};

export default loginController;
