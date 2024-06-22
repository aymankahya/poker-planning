import { Socket } from 'socket.io';
import updateAllClientSession from '@/event/updateAllClientSession';
import { Issue, Session } from '@/models';

const deleteIssue = async (roomId: string, issueId: string, socket: Socket) => {
  try {
    const session = await Session.findById(roomId).exec();
    await session?.updateOne({ issues: session.issues.filter((issue) => issue.toString() !== issueId) });
    if (session?.activeIssue === issueId) await session?.updateOne({ activeIssue: '' });
    await Issue.deleteOne({ _id: issueId }).exec();
    updateAllClientSession(roomId);
  } catch (err) {
    return socket.emit('error-deleting-issue');
  }
};

export default deleteIssue;
