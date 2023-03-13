import { Response, Request } from 'express';
import sortLeaderboard from '../utils/sortTeams';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderBoardController {
  private _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
  }

  async getAll(_req:Request, res: Response) {
    const teamsStatistic = await this._service.calculatePointsHome();
    const sortedTeams = sortLeaderboard(teamsStatistic);

    return res.status(200).json(sortedTeams);
  }

  async getAllAway(_req:Request, res: Response) {
    const teamsStatistic = await this._service.calculatePointsAway();
    const sortedTeams = sortLeaderboard(teamsStatistic);

    return res.status(200).json(sortedTeams);
  }

  async getAllTotal(_req:Request, res: Response) {
    const teamsStatistic = await this._service.calculateTotalPoints();
    const sortedTeams = sortLeaderboard(teamsStatistic);

    return res.status(200).json(sortedTeams);
  }
}
export default LeaderBoardController;
