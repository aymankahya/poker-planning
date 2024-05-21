import { Socket } from 'socket.io';
import { Session } from '@/models/Session';

const joinSession = async (roomId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId);
    if (!session) socket.emit('error-joining-session');
    await socket.join(roomId);
    socket.broadcast.to(roomId).emit('update-session');
  } catch (err) {
    socket.emit('error-joining-session');
  }
};

export default joinSession;
