import { Socket } from 'socket.io';
import { Session } from '@/models/Session';

const createSession = async (roomId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId);
    if (!session) socket.emit('error-joining-session');
    await socket.join(roomId);
    socket.emit('session-joined');
  } catch (err) {
    await Session.deleteMany({ _id: roomId });
    socket.emit('error-joining-session');
  }
};

export default createSession;
