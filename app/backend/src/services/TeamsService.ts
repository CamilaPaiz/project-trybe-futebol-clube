import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import IServiceTeams from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<Teams[]> {
    return this.model.findAll();
  }

  async getById(id:number): Promise<Teams> {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new Error('Team not found');
    return team;
  }
}
