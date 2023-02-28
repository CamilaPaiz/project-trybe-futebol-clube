import Teams from '../database/models/TeamsModel';

export default interface IServiceTeams{
  getAll():Promise<Teams[]>;
}
