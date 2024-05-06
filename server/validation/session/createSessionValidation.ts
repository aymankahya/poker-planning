import { Request, Response, NextFunction } from 'express';
import { body, check, validationResult } from 'express-validator';

const createSessionValidation = [
  check('guestName')
    .if(body('guestName').exists())
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Guest name should be at least 3 characters long'),

  check('sessionName')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Session name should be at least 3 characters long'),

  // check('votingSystem').trim().escape().isNumeric(),

  check('adminAll').trim().escape().isBoolean(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default createSessionValidation;
