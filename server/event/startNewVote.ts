import { Socket } from 'socket.io';
import { io } from '@/app';
import { Session } from '@/models';
import getSessionData from '@/utils/getSessionData';

const startNewVote = async (roomId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId).exec();
    if (!session) return socket.emit('error-revealing-card');

    session.currentVotes?.clear();
    await session.save();
    await session.updateOne({ votingState: 'notStarted' }).exec();

    io.of('/session')
      .in(roomId)
      .emit('update-session', await getSessionData(roomId));
  } catch (err) {
    socket.emit('error-starting-new-vote');
  }
};

export default startNewVote;
