import { Socket } from 'socket.io';
import { Session } from '@/models';
import getSessionData from '@/utils/getSessionData';
import { io } from '@/app';

const revealCards = async (roomId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId).exec();
    if (!session) return socket.emit('error-revealing-card');

    await session.updateOne({ votingState: 'completed' }).exec();

    io.of('/session')
      .in(roomId)
      .emit('update-session', await getSessionData(roomId));
  } catch (err) {
    socket.emit('error-revealing-card');
  }
};

export default revealCards;
