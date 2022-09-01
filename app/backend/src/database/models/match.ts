import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './team';

const matches = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
};

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}
Matches.init(
  matches,
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'Matches',
    tableName: 'matches',
  },
);
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
export default Matches;
