import { Response, Request } from 'express';
import ILoginService from '../interfaces/ILoginService';

class LoginController {
  private _service : ILoginService;

  constructor(service:ILoginService) {
    this._service = service;
  }

  async createLogin(req:Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.createLogin(email, password);
    return res.status(200).json(result);
  }

  static async getLogin(req:Request, res:Response) {
    return res.status(200).json({ role: req.body.user.role });
  }
}

export default LoginController;
