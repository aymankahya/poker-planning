import { Socket } from 'socket.io';
import { Session } from '@/models/Session';
import getSessionData from '@/utils/getSessionData';

const joinSession = async (roomId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId);
    if (!session) socket.emit('error-joining-session');
    await socket.join(roomId);
    socket.broadcast.to(roomId).emit('update-session', await getSessionData(roomId));
  } catch (err) {
    socket.emit('error-joining-session');
  }
};

export default joinSession;
