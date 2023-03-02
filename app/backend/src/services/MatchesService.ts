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
          as: 'home_team_id',
          attributes: ['teamName'],
          required: true,
        },
        {
          model: Teams,
          as: 'away_team_id',
          attributes: ['teamName'],
          required: true,
        },
      ],
    });
    return match;
  }
}
