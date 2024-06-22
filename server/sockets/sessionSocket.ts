import createSession from '@/event/createSession';
import { io } from '@/app';

const setupSessionSocket = () => {
  const sessionNamespace = io.of('/session');
  sessionNamespace.on('connection', (socket) => {
    // Create session event listener
    socket.on('create-session', (roomId) => createSession(roomId, socket));
  });
};

export default setupSessionSocket;
