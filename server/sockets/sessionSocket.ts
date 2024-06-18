import { io } from '@/app';
import {
  createSession,
  joinSession,
  leaveSession,
  revealCards,
  startNewVote,
  submitVote,
  updateAllClientSession,
  setActiveIssue,
  setEstimatedPoint,
  deleteIssue,
  editIssue,
} from '@/event';

const setupSessionSocket = () => {
  const sessionNamespace = io.of('/session');
  const users = new Map();
  sessionNamespace.on('connection', (socket) => {
    // Saving user related information to the users Map
    socket.on('register-user', (idRoom, user) => {
      users.set(socket.id, { ...user, roomId: idRoom });
    });
    // Handling creating session event
    socket.on('create-session', (roomId) => createSession(roomId, socket));

    // Handling joining session event
    socket.on('join-session', (roomId) => joinSession(roomId, socket));

    // Handling leaving session event
    socket.on('leave-session', (roomId, user) => leaveSession(roomId, user, socket));

    // Handling submitting a vote event
    socket.on('submit-vote', (sessionId, userId, vote) => submitVote(sessionId, userId, vote, socket));

    // Handling revealing cards event
    socket.on('reveal-cards', (roomId) => revealCards(roomId, socket));

    // Handling starting new vote event
    socket.on('start-new-vote', (roomId) => startNewVote(roomId, socket));

    // Handling updating all clients session event
    socket.on('update-all-session', (roomId) => updateAllClientSession(roomId));

    // Handling setting active issue event
    socket.on('set-active-issue', (roomId, issueId) => setActiveIssue(roomId, issueId, socket));

    // Handling setting new estimated points event
    socket.on('set-estimated-points', (roomId, issueId, newEstimatedPoints) =>
      setEstimatedPoint(roomId, issueId, newEstimatedPoints, socket),
    );

    // Handling deleting issue event
    socket.on('delete-issue', (roomId, issueId) => deleteIssue(roomId, issueId, socket));

    // Handling editing issue event
    socket.on('edit-issue', (roomId, issueId, newTitleValue, newTypeValue) =>
      editIssue(roomId, issueId, newTitleValue, newTypeValue, socket),
    );

    // Handling user disconnecting from session
    socket.on('disconnect', () => {
      leaveSession(users.get(socket.id)?.roomId, users.get(socket.id), socket);
      users.delete(socket.id);
    });
  });
};

export default setupSessionSocket;
