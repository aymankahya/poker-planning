import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const guestNameValidation = [
  check('guestName')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Guest display name should be at least 3 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default guestNameValidation;
