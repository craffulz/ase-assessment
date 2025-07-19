import { RefreshTokenModel } from "../models/refreshToken.model.js";
import { TokenUtil } from "../utils/token.util.js";

export const loginMiddleware = async (req, res, next) => {
  console.log("LOGIN MIDDLEWARE");

  const refreshToken = req.cookies.refreshToken;

  console.log("Refresh token from AUTO-LOG \n", refreshToken);
  if (!refreshToken) {
    console.log("No refresh token found, next()");
    return next();
  }

  try {
    const user = TokenUtil.verifyRefreshToken(refreshToken);

    const db_refreshToken = await RefreshTokenModel.getToken(refreshToken); //check the refresh token in our DB

    if (!db_refreshToken) throw new Error("Refresh token not found");

    let { is_revoked, ip: dbIP } = db_refreshToken;

    if (is_revoked) throw new Error("Revoked refresh token!, Who are you?"); //check if its revoked -> Deny access

    const xForwardedFor = req.headers["x-forwarded-for"]; //check ip

    const clientIP = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : req.socket.remoteAddress;

    if (clientIP !== dbIP) throw new Error("Mismatch ip, who are you?"); //check if its the same IP, here we can implement more functionalities, like an email

    /**
     * Once here, client ip is the same that we have stored in our DB and token is not revoked.
     *
     * So, we revoke this refresh token and create another,
     * send it in the req, sign a new access_token and send it aswell
     */

    await RefreshTokenModel.revokeToken(refreshToken); //revoke old refreshToken

    const new_refreshToken = TokenUtil.signRefreshToken(user.id, user.email); //sign new refreshToken

    await RefreshTokenModel.insertToken(new_refreshToken, user.id, clientIP); //save new refreshToken in DB

    const new_access_token = TokenUtil.signAccessToken(user.id, user.email); //sign new access_token

    res.cookie("refreshToken", new_refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.setHeader("Authorization", `Bearer ${new_access_token}`); //setHeader authorization

    res.locals.user = { id: user.id, email: user.email };

    console.log("Token refreshed");
    return next();
  } catch (error) {
    console.log(error);
    res.clearCookie("refreshToken");
    return next();
  }
};
