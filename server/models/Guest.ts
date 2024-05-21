import { Schema, Types, model } from 'mongoose';

export interface IGuest extends Document {
  _id: Types.ObjectId;
  guestName: string;
}

export const GuestSchema = new Schema<IGuest>({
  guestName: { type: String, required: true },
});

export const Guest = model('Guest', GuestSchema);
