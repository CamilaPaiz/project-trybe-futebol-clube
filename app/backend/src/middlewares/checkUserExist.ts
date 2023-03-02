import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';

export default async function checkUserExists(req: Request, res: Response, next: NextFunction)
  : Promise<void> {
  const { email, password } = req.body;

  const loginService = new LoginService();
  const userExists = await loginService.createLogin(email, password);
  console.log(userExists);
  if (!userExists) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  next();
}
