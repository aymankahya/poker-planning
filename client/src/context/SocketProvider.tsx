import useCreateSocket from '@/hooks/useCreateSocket';
import { PropsWithChildren, createContext } from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children }: PropsWithChildren) {
  const { socket } = useCreateSocket();

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
