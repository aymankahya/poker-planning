import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Session } from '@/models/Session';
import { IUser, User } from '@/models/User';
import { IGuest, Guest } from '@/models/Guest';

const createSessionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: IUser | null = null;
    let guest: IGuest | null = null;
    if (req.body.id) {
      user = await User.findOne({ _id: req.body.id }).exec();
    } else if (req.body.guestId) {
      guest = await Guest.findOne({ _id: req.body.guestId }).exec();
    } else {
      return res.status(400).json({ error: 'Missing ID in body' });
    }

    const session = new Session({
      sessionName: req.body.sessionName,
      players: user ? [user?._id] : [],
      guests: !user ? [guest] : [],
      admin: user ? [user] : [guest?._id],
      votingSystem: req.body.votingSystem,
      currentVotes: new Map(),
      votingState: 'notStarted',
      activeIssue: '',
    });

    await session.save();

    res.status(200).json({ sessionId: session._id });
  } catch (err) {
    next(err);
  }

  next();
};

export default createSessionController;
