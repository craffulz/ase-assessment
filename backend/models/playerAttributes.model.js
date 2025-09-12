

export default (sequelize, DataTypes) => {
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
      tableName: "PlayerAttributes",
      timestamps: false,
      underscored: true,
    }
  );

  PlayerAttributes.associate = (models) => {
    PlayerAttributes.belongsTo(models.Player);
  };

  return PlayerAttributes;
};
