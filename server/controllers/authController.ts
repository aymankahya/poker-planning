import { Request, Response } from 'express';

const authController = (req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: 'Authorized' });
};

export default authController;
