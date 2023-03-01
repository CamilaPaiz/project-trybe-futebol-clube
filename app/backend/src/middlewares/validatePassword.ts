import { Request, Response, NextFunction } from 'express';

export default function validatePassword(req: Request, res: Response, next: NextFunction): void {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ message: 'All fields must be filled' });
    return;
  }

  if (password.length < 6) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  next();
}
