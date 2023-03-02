import Matches from '../database/models/MatchesModel';
/* import IMatchWithTeams from './IMatchWithTeams'; */

export default interface IMatchesService{
  getAll(): Promise<Matches[]>;
}
