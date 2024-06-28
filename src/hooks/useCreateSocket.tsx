import { useAuth } from '@/hooks';
import { getRoomIDFromUrl } from '@/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';

export default function useCreateSocket() {
  const location = useLocation();
  const { user } = useAuth();
  const roomId = getRoomIDFromUrl(location.pathname);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const socketConnection = io(`${import.meta.env.VITE_SERVER_URL}/session`);
    socketConnection.emit('register-user', roomId, user);
    // Join room
    socketConnection.emit('join-session', roomId);
    // Set socket state
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
      socketConnection.close();
    };
  }, [roomId, user]);

  return { socket };
}
