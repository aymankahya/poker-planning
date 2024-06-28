import { Socket } from 'socket.io';
import { Session } from '@/models';
import getSessionData from '@/utils/getSessionData';

type User = {
  username: string;
  id: string;
  role: 'user' | 'guest';
};

const leaveSession = async (roomId: string, user: User, socket: Socket) => {
  try {
    const session = await Session.findById(roomId).exec();
    if (!session) return socket.emit('session-left');

    if (user.role === 'guest') {
      await session
        .updateOne({
          guests: session.guests.filter((guest) => guest.toString() !== user.id),
        })
        .exec();
    } else if (user.role === 'user') {
      await session.updateOne({ players: session.players.filter((player) => player.toString() !== user.id) }).exec();
    }

    if (session?.admin.includes(user.id)) {
      await session.updateOne({ admin: session?.admin.filter((player) => player.toString() !== user.id) }).exec();
    }

    session.currentVotes?.delete(user.id);
    await session.save();

    socket.broadcast.to(roomId).emit('update-session', await getSessionData(roomId));
  } catch (err) {
    socket.emit('error-leaving-session');
  }
};

export default leaveSession;
