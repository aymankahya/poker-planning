import { Schema, Types, model } from 'mongoose';

export interface IssueI {
  _id: Types.ObjectId;
  title: string;
  description: string;
  estimatedPoints: number;
  active: boolean;
}

const IssueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedPoints: { type: Schema.Types.Mixed, required: true },
  active: { type: Boolean, required: true },
});

export const Issue = model('Issue', IssueSchema);
