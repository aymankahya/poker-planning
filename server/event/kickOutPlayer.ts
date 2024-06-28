import { Socket } from 'socket.io';
import { io } from '@/app';
import leaveSession from '@/event/leaveSession';
import updateAllClientSession from '@/event/updateAllClientSession';

const kickOutPlayer = async (
  users: Map<string, { id: string; username: string; roomId: string }>,
  roomId: string,
  playerId: string,
  userRole: 'user' | 'guest',
  socket: Socket,
) => {
  let targetSocketId = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of users.entries()) {
    if (value.id === playerId) {
      targetSocketId = key;
      break;
    }
  }

  await leaveSession(roomId, { id: playerId, role: userRole }, socket);
  updateAllClientSession(roomId);

  io.of('/session').sockets.get(targetSocketId)?.emit('kick-out');
};

export default kickOutPlayer;
