import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';

import Matches from '../database/models/MatchesModel';
import updateMatchesResponse from '../type/matches';
import IMatchUpdateGoals from '../interfaces/IMatchUpdateGoals';
import ICreateMatch from '../interfaces/ICreateMatch';

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
    return matchUpdated;
  }

  async updateMatch(id:number, goalsToUpdate: IMatchUpdateGoals):Promise<updateMatchesResponse> {
    const matchUpdated = await this.model.update(
      { homeTeamGoals: goalsToUpdate.homeTeamGoals, awayTeamGoals: goalsToUpdate.awayTeamGoals },
      { where: { id } },
    );
    return matchUpdated;
  }

  async create(data:ICreateMatch): Promise<Matches> {
    const match = await this.model.create({ ...data, inProgress: true });
    return match;
  }

  async getOne(id: number):Promise< Matches | null> {
    const result = await this.model.findOne({ where: { id } });
    return result;
  }
}
