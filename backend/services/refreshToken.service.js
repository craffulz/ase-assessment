import RefreshToken from "../models/index.js";

const getToken = async (token) => {
  try {
    return await RefreshToken.findOne({ where: { token: token } });
  } catch (error) {
    console.log("Error getting token: ");
    throw error;
  }
};

const insertToken = async (token, user_id, ip) => {
  const newToken = {
    user_id: user_id,
    ip: ip,
    token: token,
  };

  try {
    return await RefreshToken.create(newToken);
  } catch (error) {
    console.log("Error inserting refresh token: ", error);
    throw error;
  }
};

const revokeToken = async (token) => {
  try {
    return await RefreshToken.update(
      { is_revoked: true },
      { where: { token: token } }
    );
  } catch (error) {
    console.log("Error revoking refresh token: ", error);
  }
};

const deleteExpired = async () => {
  const now = new Date();

  try {
    return await RefreshToken.destroy({ where: { [Op.lt]: now } });
  } catch (error) {
    console.log("Error deleting expired tokens: ", error);
    throw error;
  }
};

const deleteToken = async (userId) => {
  console.log(userId);

  try {
    return await RefreshToken.destroy({ where: { user_id: userId } });
  } catch (error) {
    console.log("Error deleting refresh token: ", error);
    throw error;
  }
};

export const RefreshTokenService = {
  insertToken,
  getToken,
  deleteExpired,
  revokeToken,
  deleteToken,
};
