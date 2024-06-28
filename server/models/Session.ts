import { Schema, model } from 'mongoose';

export const SessionSchema = new Schema({
  sessionName: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  guests: [{ type: Schema.Types.ObjectId, ref: 'Guest', required: true }],
  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue', required: true }],
  admin: [{ type: Schema.Types.Mixed, required: true }],
  votingSystem: [{ type: Schema.Types.Mixed, required: true }],
  currentVotes: {
    type: Map,
    of: String,
  },
  votingState: { type: String, required: true, enum: ['notStarted', 'inProgress', 'completed'], default: 'notStarted' },
  activeIssue: { type: Schema.Types.Mixed, required: true },
});

export const Session = model('Session', SessionSchema);
