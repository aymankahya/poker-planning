import { Schema, model } from 'mongoose';

export const SessionSchema = new Schema({
  sessionName: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  guests: [{ type: String }],
  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue', required: true }],
  admin: [{ type: Schema.Types.Mixed, required: true }],
  adminAll: { type: Boolean, required: true },
  votingSystem: { type: Number, required: true },
});

export const Session = model('Session', SessionSchema);
