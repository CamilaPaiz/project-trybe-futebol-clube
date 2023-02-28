import Users from '../database/models/UsersModel';

export default interface IUserService{
  getById(id:number): Promise<Users>;
}
