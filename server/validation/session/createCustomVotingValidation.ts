import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const createCustomVotingValidation = [
  check('userId')
    .trim()
    .escape()
    .matches(/[a-fA-F0-9]{24}/)
    .withMessage('Session ID is not valid'),
  check('label').trim().escape().isString(),
  check('values').trim().escape().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default createCustomVotingValidation;
