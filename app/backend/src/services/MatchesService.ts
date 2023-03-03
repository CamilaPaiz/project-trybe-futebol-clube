import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';

import Matches from '../database/models/MatchesModel';
import updateMatchesResponse from '../type/matches';
import IMatchUpdateGoals from '../interfaces/IMatchUpdateGoals';

export default class MatchesService {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<Matches[] | null> {
    const match = await this.model.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
          required: true,
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
          required: true,
        },
      ],
    });
    return match;
  }

  async update(id:number):Promise<updateMatchesResponse > {
    const matchUpdated = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    console.log('service', matchUpdated);
    return matchUpdated;
  }

  async updateMatch(id:number, goalsToUpdate: IMatchUpdateGoals):Promise<updateMatchesResponse> {
    const matchUpdated = await this.model.update(
      { homeTeamGoals: goalsToUpdate.homeTeamGoals, awayTeamGoals: goalsToUpdate.awayTeamGoals },
      { where: { id } },
    );
    console.log('service', matchUpdated);
    return matchUpdated;
  }

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matches> {
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    console.log('service', match);
    return match;
  }
}
