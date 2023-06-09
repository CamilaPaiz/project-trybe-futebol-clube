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

  async getOne(req:Request, res:Response) {
    const { id } = req.params;
    const result = await this._service.getOne(Number(id));
    return res.status(200).json(result);
  }

  async update(req:Request, res:Response) {
    const { id } = req.params;
    const result = await this._service.update(Number(id));
    if (result[0] > 0) {
      return res.status(200).json({ message: 'Finished' });
    }
    return res.status(400).json({ message: ' Update denied ' });
  }

  async updateMatch(req:Request, res:Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service.updateMatch(Number(id), { homeTeamGoals, awayTeamGoals });
    if (result[0] > 0) {
      return res.status(200).json({ message: 'Goals Updated' });
    }
    return res.status(400).json({ message: '  Update denied ' });
  }

  async create(req:Request, res:Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const homeId = await this._service.getOne(homeTeamId);
    const awayId = await this._service.getOne(awayTeamId);
    if (!homeId || !awayId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const result = await this._service.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals },
    );
    return res.status(201).json(result);
  }
}

export default MatchesController;
