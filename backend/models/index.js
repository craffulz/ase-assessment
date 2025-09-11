import Auth from "./auth.model.js";
import Player from "./player.model.js";
import PlayerAttributes from "./playerAttributes.model.js";
import RefreshToken from "./refreshToken.model.js";
import Report from "./report.model.js";
import Scout from "./scout.model.js";

export default {
  models: {
    Auth,
    RefreshToken,
    Scout,
    Player,
    Report,
    PlayerAttributes,
  },
};
