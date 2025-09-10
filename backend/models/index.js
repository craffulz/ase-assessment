import { Sequelize } from "sequelize";
import Auth from "./auth.model.js";
import Player from "./player.model.js";
import PlayerAttributes from "./playerAttributes.model.js";
import RefreshToken from "./refreshToken.model.js";
import Report from "./report.model.js";
import Scout from "./scout.model.js";

Auth.hasMany(RefreshToken, {
  foreignKey: "user_id",
  as: "refreshTokens",
});

Auth.hasMany(Scout, {
  foreignKey: "user_id",
  as: "scouts",
});

RefreshToken.belongsTo(Auth, {
  foreignKey: "user_id",
  as: "auth",
});

Scout.belongsTo(Auth, {
  foreignKey: "user_id",
  as: "auth",
});

Scout.hasMany(Report, {
  foreignKey: "scout_id",
  as: "reports",
});

Player.hasMany(Report, {
  PlayerAttributes: "player_id",
  as: "reports",
});

Player.hasOne(PlayerAttributes, {
  PlayerAttributes: "player_id",
  as: "attributes",
});

Report.belongsTo(Scout, {
  foreignKey: "scout_id",
  as: "scout",
});

Report.belongsTo(Player, {
  foreignKey: "player_id",
  as: "player",
}); 

PlayerAttributes.belongsTo(Player, {
  foreignKey: "player_id",
  as: "player",
});

export default {
  Auth,
  Scout,
  Player,
  PlayerAttributes,
  Report,
  RefreshToken,
};
