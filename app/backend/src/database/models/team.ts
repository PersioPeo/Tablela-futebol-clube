import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id: number;
  teamName: string;
}
Teams.init(
  {
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
  },
  {
    tableName: 'teams',
    modelName: 'teams',
    sequelize: db,
    underscored: true,
    timestamps: false,
  },
);
export default Teams;
