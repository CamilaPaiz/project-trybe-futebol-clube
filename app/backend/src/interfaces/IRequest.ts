import { Request } from 'express';
import IUser from './IUser';

interface IAuthenticatedRequest extends Request{
  user:IUser
}

export default IAuthenticatedRequest;
