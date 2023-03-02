import { Response, Request } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  private _service : MatchesService;

  constructor(service:MatchesService) {
    this._service = service;
  }

  async getAll(_req:Request, res: Response) {
    const result = await this._service.getAll();
    console.log('controle', result);
    return res.status(200).json(result);
  }
}

export default MatchesController;
