import { Socket } from 'socket.io';
import { Session } from '@/models';
import { io } from '@/app';
import getSessionData from '@/utils/getSessionData';

const submitVote = async (sessionId: string, id: string, newVote: string, socket: Socket) => {
  try {
    const session = await Session.findById(sessionId).exec();
    await session?.updateOne({ votingState: 'inProgress' }).exec();
    session?.currentVotes?.set(id, newVote);

    await session?.save();
    io.of('/session')
      .in(sessionId)
      .emit('update-session', await getSessionData(sessionId));
  } catch (err) {
    socket.emit('error-submiting-vote');
  }
};

export default submitVote;
