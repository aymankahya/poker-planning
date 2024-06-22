import { Socket } from 'socket.io';
import updateAllClientSession from '@/event/updateAllClientSession';
import { Session } from '@/models';

const setActiveIssue = async (roomId: string, issueId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId).exec();
    if (!session) return socket.emit('error-setting-active-issue');

    await session.updateOne({ activeIssue: issueId === session.activeIssue ? '' : issueId });

    updateAllClientSession(roomId);
  } catch (err) {
    return socket.emit('error-setting-active-issue');
  }
};

export default setActiveIssue;
