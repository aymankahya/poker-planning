import { Request, Response } from 'express';
import { Session } from '@/models/Session';

const getSessionData = async (req: Request, res: Response) => {
  try {
    if (!(req.query.id as string).match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ error: 'ID provided is not a valid session ID' });

    const session = await Session.findById(req.query.id)
      .populate({ path: 'players', model: 'User' })
      .populate({ path: 'guests', model: 'Guest' })
      .populate('issues')
      .exec();

    if (!session) return res.status(404).json({ error: `No Session exists with ID :${req.query.id}` });

    return res.status(200).json({
      sessionName: session?.sessionName,
      players: session?.toObject().players.map((player) => {
        // @ts-expect-error => Typescript doesn't recognize populated fields type
        return { id: player._id, username: player.username };
      }),
      issues: session?.issues,
      guests: session?.toObject().guests.map((guest) => {
        // @ts-expect-error => Typescript doesn't recognize populated fields type
        return { id: guest._id, username: guest.guestName };
      }),
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
