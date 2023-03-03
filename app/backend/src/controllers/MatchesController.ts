import { Response, Request } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  private _service : MatchesService;

  constructor(service:MatchesService) {
    this._service = service;
  }

  async getAll(req:Request, res: Response) {
    const { inProgress } = req.query;
    const result = await this._service.getAll();
    if (inProgress !== undefined) {
      const findInProgress = result?.filter((match) => match
        .inProgress === (inProgress === 'true'));
      return res.status(200).json(findInProgress);
    }

    return res.status(200).json(result);
  }
}

export default MatchesController;
