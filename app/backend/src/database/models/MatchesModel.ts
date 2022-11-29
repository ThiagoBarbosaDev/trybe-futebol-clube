import { Model, INTEGER, NUMBER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'matches',
});

TeamsModel.belongsTo(MatchesModel, { foreignKey: 'home_team', as: 'homeTeam' });
TeamsModel.belongsTo(MatchesModel, { foreignKey: 'away_team', as: 'awayTeam' });

TeamsModel.hasMany(MatchesModel, { foreignKey: 'home_team', as: 'homeTeamMatches' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'away_team', as: 'awayTeamMatches' });

export default MatchesModel;
