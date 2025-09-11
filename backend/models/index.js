import AuthFactory from "./auth.model.js";
import PlayerFactory from "./player.model.js";
import PlayerAttributesFactory from "./playerAttributes.model.js";
import RefreshTokenFactory from "./refreshToken.model.js";
import ReportFactory from "./report.model.js";
import ScoutFactory from "./scout.model.js";

export const createAndAssociate = (sequelize) => {
  const Auth = AuthFactory(sequelize);
  const RefreshToken = RefreshTokenFactory(sequelize);
  const Scout = ScoutFactory(sequelize);
  const Player = PlayerFactory(sequelize);
  const Report = ReportFactory(sequelize);
  const PlayerAttributes = PlayerAttributesFactory(sequelize);

  console.log("a ver que cojones es esto", typeof Auth);

  console.log(sequelize.models);
  const models = sequelize.models;

  Object.values(models).forEach((model) =>
    models[model.name].associate(models)
  );
};
