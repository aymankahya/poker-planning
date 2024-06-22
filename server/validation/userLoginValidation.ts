import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateUserLoginInfo = [
  check('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email provided is not valid')
    .normalizeEmail({ gmail_remove_dots: false }),

  check('password').trim().escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default validateUserLoginInfo;
