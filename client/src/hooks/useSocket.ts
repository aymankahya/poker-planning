import { SocketContext } from '@/context/SocketProvider';
import { useContext } from 'react';

export default function useSocket() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useSocket must be used inside SocketProvider');
  }

  return { socket: context };
}
