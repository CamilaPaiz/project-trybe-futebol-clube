import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../utils/auth';

export default async function verifyToken(req: Request, res: Response, next: NextFunction)
  : Promise<void> {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: 'Token not found' });
    return;
  }
  try {
    const authenticated = await authenticateToken(token); // authenticateToken to verify the token
    if (!authenticated) {
      res.status(401).send({ message: 'Token must be a valid token' });
      return;
    }

    req.body.user = authenticated;

    next();
  } catch (err) {
    next(err);
  }
}
