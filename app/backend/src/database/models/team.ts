import { DataTypes, Model } from 'sequelize';
import db from '.';

const teams = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    field: 'team_name',
    allowNull: false,
  },
};

class Teams extends Model {
  id: number;
  teamName: string;
}
Teams.init(
  teams,
  {
    tableName: 'teams',
    modelName: 'teams',
    sequelize: db,
    underscored: true,
    timestamps: false,
  },
);
export default Teams;
