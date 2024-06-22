import { Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { Session } from '@/models';

const joinSessionController = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.body.sessionId).exec();

    if (!session) return res.status(404).json({ error: 'No session found with provided ID' });

    if (req.body.id) {
      const userId = mongoose.Types.ObjectId.createFromHexString(req.body.id);
      await session.updateOne({ players: [...session.players, userId] }).exec();
    } else if (req.body.guestId) {
      const guestId = mongoose.Types.ObjectId.createFromHexString(req.body.guestId);
      await session.updateOne({ guests: [...session.guests, guestId] }).exec();
    }

    return res.status(200).json({ message: 'Player added to database' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export default joinSessionController;
