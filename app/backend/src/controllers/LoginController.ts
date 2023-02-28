import { Response, Request } from 'express';
import ILoginService from '../interfaces/ILoginService';

class LoginController {
  private _service : ILoginService;

  constructor(service:ILoginService) {
    this._service = service;
  }

  async createLogin(req:Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json('All fields must be filled');
    }

    const result = await this._service.createLogin(email, password);
    if (!result) {
      return res.status(401).json('Invalid email or password');
    }
    return res.status(200).json(result);
  }
}

export default LoginController;
