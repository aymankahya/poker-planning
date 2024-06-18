import { Request, Response, NextFunction } from 'express';
import { Issue, Session } from '@/models';

const createNewIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await Session.findById(req.body.sessionId).exec();
    if (!session) return res.status(404).json({ error: 'No session with given ID was found' });

    const newIssue = new Issue({
      type: req.body.type,
      title: req.body.title,
      estimatedPoints: '-',
    });

    await newIssue.save();

    await session.updateOne({ issues: [...session.issues, newIssue._id] });

    res.status(200).json({ msg: 'Issue created successfuly' });
  } catch (err) {
    next(err);
  }
};

export default createNewIssue;
