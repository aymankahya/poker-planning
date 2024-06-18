import { Socket } from 'socket.io';
import updateAllClientSession from '@/event/updateAllClientSession';
import { Issue } from '@/models';

const editIssue = async (
  roomId: string,
  issueId: string,
  newTitleValue: string,
  newTypeValue: string,
  socket: Socket,
) => {
  try {
    const issue = await Issue.findById(issueId).exec();
    if (!issue) return socket.emit('error-editing-issue');

    await issue.updateOne({ type: newTypeValue, title: newTitleValue });

    updateAllClientSession(roomId);
  } catch (err) {
    return socket.emit('error-editing-issue');
  }
};

export default editIssue;
