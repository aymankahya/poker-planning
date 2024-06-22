import { Schema, Types, model } from 'mongoose';

export interface IssueI {
  _id: Types.ObjectId;
  type: string;
  title: string;
  estimatedPoints: number;
}

const IssueSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  estimatedPoints: { type: Schema.Types.Mixed, required: true },
});

export const Issue = model('Issue', IssueSchema);
