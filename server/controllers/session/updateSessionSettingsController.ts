import { Request, Response, NextFunction } from 'express';
import { Session } from '@/models';

const updateSessionSettingsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await Session.findById(req.body.roomId).exec();
    if (!session) return res.status(404).json({ error: 'No session with provided ID were found' });

    if (session.votingSystem.toString() === req.body.votingSystem.toString()) {
      await session.updateOne({
        sessionName: req.body.sessionName,
        admin: req.body.sessionAdmin,
        votingSystem: req.body.votingSystem,
      });

      return res.status(200).json({ success: true });
    }

    await session.updateOne({
      sessionName: req.body.sessionName,
      admin: req.body.sessionAdmin,
      votingSystem: req.body.votingSystem,
      votingState: 'notStarted',
    });
    session.currentVotes?.clear();

    await session.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' });
    next(err);
  }
};

export default updateSessionSettingsController;
