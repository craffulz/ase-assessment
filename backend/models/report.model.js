
export default (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Player",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      scout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Auth",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      match_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      overall_rating: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      strengths: {
        type: DataTypes.TEXT,
      },
      weaknesses: {
        type: DataTypes.TEXT,
      },
      recommendation: {
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "Report",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Report.associate = (models) => {
    Report.belongsTo(models.Scout);
    Report.belongsTo(models.Player);
  };
};
