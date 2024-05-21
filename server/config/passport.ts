import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import path from 'path';
import fs from 'fs';
import { User } from '@/models/User';
import { Guest } from '@/models/Guest';

const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', 'rsa_key_prv.pem'), 'utf-8');

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY, // Update with Public Key Value
  algorithms: ['RS256'],
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    if (payload.role === 'guest') {
      const guest = await Guest.findOne({ _id: payload.sub }).exec();
      if (!guest) return done(null, false);
      return done(null, guest);
    }

    const user = await User.findOne({ _id: payload.sub }).exec();
    // User not found in database
    if (!user) return done(null, false);
    // User found in database
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default strategy;
