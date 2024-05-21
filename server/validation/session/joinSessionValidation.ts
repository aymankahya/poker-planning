import { Request, Response, NextFunction } from 'express';
import { check, body, validationResult } from 'express-validator';

const joinSessionValidation = [
  check('sessionId')
    .trim()
    .escape()
    .matches(/[a-fA-F0-9]{24}/)
    .withMessage('Session ID is not valid'),
  check('guestName')
    .if(body('guestName').exists())
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Display name should be at least 3 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default joinSessionValidation;
