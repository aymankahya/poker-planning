import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const createNewIssueValidation = [
  check('type').trim().escape().isString(),

  check('title').trim().escape().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export default createNewIssueValidation;
