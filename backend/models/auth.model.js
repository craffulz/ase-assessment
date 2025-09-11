export default (sequelize, DataTypes) => {
  const Auth = sequelize.define("Auth", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  Auth.associate = (models) => {
    Auth.hasMany(models.RefreshToken);
  };

  return Auth;
};
