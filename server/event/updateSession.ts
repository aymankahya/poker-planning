import { Socket } from 'socket.io';

const updateSession = async (roomId: string, socket: Socket) => {
  socket.to(roomId).emit('update-session');
};

export default updateSession;
