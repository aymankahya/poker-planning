import { Schema, model, Types } from 'mongoose';
import { capitalize } from 'lodash';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

export const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual('username').get(function getVirtual() {
  return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
});

export const User = model('User', UserSchema);
