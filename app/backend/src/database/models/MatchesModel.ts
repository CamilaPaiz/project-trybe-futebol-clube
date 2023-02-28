import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  declare readonly id: number;
  declare homeTeamId : number;
  declare homeTeamGoals : number;
  declare awayTeamId : number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Matches.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'awayTeamId' });
Teams.hasMany(Matches, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Teams.hasMany(Matches, { foreignKey: 'away_team_id', as: 'awayTeamId' });

export default Matches;
