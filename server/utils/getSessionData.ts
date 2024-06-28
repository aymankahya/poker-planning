import { Session } from '@/models';

const getSessionData = async (roomId: string) => {
  const session = await Session.findById(roomId)
    .populate({ path: 'players', model: 'User' })
    .populate({ path: 'guests', model: 'Guest' })
    .populate('issues')
    .exec();

  return {
    sessionName: session?.sessionName,
    players: session?.toObject().players.map((player) => {
      // @ts-expect-error => Typescript doesn't recognize populated fields type
      return { id: player._id, username: player.username };
    }),
    issues: session?.toObject().issues.map((issue) => {
      // @ts-expect-error => Typescript doesn't recognize populated fields type
      return { id: issue._id, type: issue.type, title: issue.title, estimatedPoints: issue.estimatedPoints };
    }),
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
    settings: { votingSystem: session?.votingSystem },
    currentVotes: session?.currentVotes,
    votingState: session?.votingState,
    activeIssue: session?.activeIssue,
  };
};

export default getSessionData;
