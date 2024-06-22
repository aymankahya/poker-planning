import { io } from '@/app';
import { createSession, joinSession, leaveSession, updateSession } from '@/event';

const setupSessionSocket = () => {
  const sessionNamespace = io.of('/session');
  const users = new Map();
  sessionNamespace.on('connection', (socket) => {
    socket.on('register-user', (idRoom, user) => {
      users.set(socket.id, { ...user, roomId: idRoom });
    });
    socket.on('create-session', (roomId) => createSession(roomId, socket));
    socket.on('join-session', (roomId) => joinSession(roomId, socket));
    socket.on('leave-session', (roomId, user) => leaveSession(roomId, user, socket));
    socket.on('update-session', (roomId) => updateSession(roomId, socket));
    socket.on('disconnect', () => {
      leaveSession(users.get(socket.id)?.roomId, users.get(socket.id), socket);
      users.delete(socket.id);
    });
  });
};

export default setupSessionSocket;
