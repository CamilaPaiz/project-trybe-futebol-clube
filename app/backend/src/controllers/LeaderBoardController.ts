import { Response, Request } from 'express';
import sortLeaderboard from '../utils/sortTeams';
/* import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic'; */
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
}
export default LeaderBoardController;
