import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Session } from '@/models/Session';
import { IUser, User } from '@/models/User';

const createSessionController = async (req: Request, res: Response, next: NextFunction) => {
  // Find User document in database if already signed in

  let user: IUser | null = null;
  if (req.body.id) {
    user = await User.findOne({ _id: req.body.id }).exec();
  }
  // // Create a new Room instance in the database

  try {
    const session = new Session({
      sessionName: req.body.sessionName,
      players: user ? [user?._id] : [],
      guests: !user ? [req.body.guestName] : [],
      admin: user ? [user] : [req.body.guestName],
      adminAll: req.body.adminAll,
      votingSystem: req.body.voteSystem,
    });

    await session.save();

    res.status(200).json({ sessionId: session._id });
  } catch (err) {
    next(err);
  }

  next();
};

export default createSessionController;
