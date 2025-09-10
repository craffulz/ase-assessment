import { DataTypes } from "sequelize";

const RefreshToken = sequelize.define("RefreshToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Auth",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_revoked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  ip: { type: DataTypes.STRING(50), allowNull: false },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default RefreshToken;
