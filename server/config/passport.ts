import { Strategy as JWTStrategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import path from 'path';
import fs from 'fs';
import { User } from '@/models/User';

const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', 'rsa_key_prv.pem'), 'utf-8');

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY, // Update with Public Key Value
  algorithms: ['RS256'],
  passReqToCallback: true,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
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
