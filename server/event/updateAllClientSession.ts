import { io } from '@/app';
import getSessionData from '@/utils/getSessionData';

const updateAllClientSession = async (roomId: string) => {
  io.of('/session')
    .in(roomId)
    .emit('update-session', await getSessionData(roomId));
};

export default updateAllClientSession;
