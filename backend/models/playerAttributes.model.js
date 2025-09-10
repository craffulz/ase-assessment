import { DataTypes } from "sequelize";

const PlayerAttributes = sequelize.define(
  "PlayerAttributes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Player",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    pace: {
      type: DataTypes.SMALLINT,
    },
    shooting: {
      type: DataTypes.SMALLINT,
    },
    passing: {
      type: DataTypes.SMALLINT,
    },
    defending: {
      type: DataTypes.SMALLINT,
    },
    dribbling: {
      type: DataTypes.SMALLINT,
    },
    physical: {
      type: DataTypes.SMALLINT,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default PlayerAttributes;
