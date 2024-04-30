import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateUserRegisterInfo = [
  check('firstName').trim().escape().isLength({ min: 3 }),
  check('lastName').trim().isLength({ min: 3 }),
  check('email').trim().escape().isEmail().normalizeEmail({ gmail_remove_dots: false }),
  check('password')
    .trim()
    .escape()
    .matches(/^(?!.*?(.)\1\1)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,}$/)
    .withMessage("Password doesn't respect security rules"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default validateUserRegisterInfo;
