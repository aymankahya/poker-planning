import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import path from "path";
import fs from "fs";

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "dummy", // Update with Public Key Value
  algorithms: ["RS256"],
  passReqToCallback: true,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  // Implement the startegy handling here
});

export default strategy;
