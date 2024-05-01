import { Schema, model } from 'mongoose';
import { capitalize } from 'lodash';

export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    virtuals: {
      username: {
        get() {
          return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
        },
      },
    },
  },
);

//= ===========================================================================================================//
// Creating virtuals this way poses a typing issue when trying to get the virtual value later in controllers
//= ===========================================================================================================//
// UserSchema.virtual("username").get(function () {
//   return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
// });

export const User = model('User', UserSchema);
