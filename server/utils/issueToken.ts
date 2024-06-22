import { sign } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { InferSchemaType, Document } from 'mongoose';
import { UserSchema } from '@/models/User';

type User = InferSchemaType<typeof UserSchema>;

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', 'rsa_key_prv.pem'), 'utf-8');

const issueToken = (user: User & Document, validityDuration: string | number | undefined) => {
  const id = user._id;
  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = sign(payload, PRIVATE_KEY, {
    expiresIn: validityDuration,
    algorithm: 'RS256',
  });

  return `Bearer ${signedToken}`;
};

export default issueToken;
