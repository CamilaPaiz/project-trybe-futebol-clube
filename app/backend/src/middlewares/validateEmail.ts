import { Request, Response, NextFunction } from 'express';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function validateEmail(req: Request, res: Response, next: NextFunction): void {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'All fields must be filled' });
    return;
  }
  console.log(emailRegex.test(email));
  if (!emailRegex.test(email)) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  next();
}
