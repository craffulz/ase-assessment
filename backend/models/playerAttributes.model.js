import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.database.js";

const PlayerAttributes = sequelize.define(
  "PlayerAttributes",
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "players",
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
    tableName: "player_attributes",
    timestamps: false,
    underscored: true,
  }
);

PlayerAttributes.associate = function (models) {
  PlayerAttributes.belongsTo(models.Player, {
    foreignKey: "player_id",
    as: "player",
  });
};

export default PlayerAttributes;
