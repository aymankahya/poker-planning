import { Request, Response } from 'express';
import { Session } from '@/models/Session';

const getSessionData = async (req: Request, res: Response) => {
  try {
    if (!(req.query.id as string).match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ error: 'ID provided is not a valid session ID' });

    const session = await Session.findById(req.query.id)
      .populate({ path: 'players', model: 'User' })
      .populate('issues')
      .exec();

    if (!session) return res.status(404).json({ error: `No Session exists with ID :${req.query.id}` });

    return res.status(200).json({
      sessionName: session?.sessionName,
      // @ts-expect-error => Typescript doesn't recognize populated fields type
      players: session?.toObject().players.map((player) => player.username),
      issues: session?.issues,
      guests: session?.guests,
      admin: session?.admin.map((admin) => {
        if (typeof admin === 'string') {
          return admin;
        }
        return admin._id;
      }),
      settings: { adminAll: session?.adminAll, votingSystem: session?.votingSystem },
    });
  } catch (err) {
    return res.status(500);
  }
};

export default getSessionData;
