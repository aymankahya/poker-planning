import { Request, Response, NextFunction } from 'express';
import { Guest } from '@/models/Guest';
import issueToken from '@/utils/issueToken';

const createGuestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGuest = new Guest({ guestName: req.body.guestName });
    await newGuest.save();
    const jwtToken = issueToken(newGuest, 'guest', '4h');
    return res.status(200).json({
      message: 'Guest created successfully',
      token: jwtToken.token,
      id: newGuest._id,
      username: newGuest.guestName,
    });
  } catch (err) {
    next(err);
  }
};

export default createGuestController;
