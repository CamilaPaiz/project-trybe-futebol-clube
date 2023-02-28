import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import IServiceTeams from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<Teams[]> {
    return this.model.findAll();
  }
}
