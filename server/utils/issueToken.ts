import { sign } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { InferSchemaType, Document } from 'mongoose';
import { UserSchema } from '@/models/User';
import { GuestSchema } from '@/models/Guest';

type User = InferSchemaType<typeof UserSchema>;
type Guest = InferSchemaType<typeof GuestSchema>;

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', 'rsa_key_prv.pem'), 'utf-8');

const issueToken = (
  user: (User & Document) | (Guest & Document),
  userRole: 'user' | 'guest',
  validityDuration: string | number | undefined,
) => {
  const id = user._id;
  const payload = {
    sub: id,
    role: userRole,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = sign(payload, PRIVATE_KEY, {
    expiresIn: validityDuration,
    algorithm: 'RS256',
  });

  return { token: `Bearer ${signedToken}`, role: userRole };
};

export default issueToken;
