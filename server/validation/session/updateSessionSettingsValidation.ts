import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const updateSessionSettingsValidation = [
  check('sessionName')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Session name should be at least 3 characters long'),
  check('sessionAdmin').isArray().withMessage('session admins must be stored in an array'),
  check('sessionAdmin.*')
    .trim()
    .escape()
    .isString()
    .matches(/[a-fA-F0-9]{24}/)
    .withMessage('Not a valid user ID'),
  check('votingSystem').trim().escape().isArray(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default updateSessionSettingsValidation;
