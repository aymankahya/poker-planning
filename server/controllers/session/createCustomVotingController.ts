import { Request, Response, NextFunction } from 'express';
import { User } from '@/models';

const createCustomValidationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.body.userId).exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.updateOne({
      customVotingSystem: [...user.customVotingSystem, { values: req.body.values.split(','), label: req.body.label }],
    });
    return res.status(200).json({
      success: true,
      customVotingSystem: [...user.customVotingSystem, { values: req.body.values.split(','), label: req.body.label }],
    });
  } catch (err) {
    next(err);
  }
};

export default createCustomValidationController;
