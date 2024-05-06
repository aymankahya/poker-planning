import { Request, Response } from 'express-serve-static-core';

const logoutController = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, msg: 'Logout successful' });
};

export default logoutController;
