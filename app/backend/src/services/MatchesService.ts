import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';

import Matches from '../database/models/MatchesModel';
/* import IMatchesService from '../interfaces/IMatchesService'; */
/* import IMatches from '../interfaces/IMatches'; */
/* import IMatchWithTeams from '../interfaces/IMatchWithTeams'; */
/* import IMatches from '../interfaces/IMatches'; */

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
}
