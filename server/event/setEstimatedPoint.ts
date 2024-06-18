import { Socket } from 'socket.io';
import { Issue } from '@/models';
import updateAllClientSession from '@/event/updateAllClientSession';

const setEstimatedPoint = async (roomId: string, issueId: string, newEstimatedPoints: string, socket: Socket) => {
  try {
    const issue = await Issue.findById(issueId).exec();
    if (!issue) return socket.emit('error-setting-estimated-point');

    await issue.updateOne({ estimatedPoints: newEstimatedPoints });

    updateAllClientSession(roomId);
  } catch (err) {
    return socket.emit('error-setting-estimated-point');
  }
};

export default setEstimatedPoint;
