import { RefreshTokenModel } from "../models/refreshToken.model.js";
import { TokenUtil } from "../utils/token.util.js";

export const accessTokenMiddleware = async (req, res, next) => {
  try {
    /**
     * This try catch block checks if the access token still active,
     * if not we catch the error and work in the different cases
     **/
    console.log(
      "Taking access token from the request: \n",
      req.headers.authorization
    );

    const bearer = req.headers.authorization; //get access token
    const accessToken = await TokenUtil.retrieveToken(bearer);

    if (!accessToken) {
      const error = new Error("\n \n Missing access_token");
      error.name = "TokenExpiredError";
      throw error;
    }
    const user = TokenUtil.verifyAccessToken(accessToken);
    res.locals.user = user;
    console.log("\n \n Access Granted!");
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("\n\n Token Expired", req.cookies);

      const refreshToken = req.cookies.refreshToken; //get the refresh token from cookies

      console.log("Taking refresh token from the request: \n", refreshToken);

      try {
        const user = TokenUtil.verifyRefreshToken(refreshToken); //check if refresh token expired

        const db_refresh_token = await RefreshTokenModel.getToken(refreshToken); //check the refresh token in our DB

        console.log("\n Took refresh token from our DB...", db_refresh_token);

        if (!db_refresh_token) throw new Error("Refresh token not found");

        let { is_revoked, ip: dbIP } = db_refresh_token;

        if (is_revoked) {
          console.log("\n Refresh token is revoked");
          //res.clearCookie("refreshToken");
          return res
            .status(401)
            .json({ ok: false, msg: "Unauthorized access" });
        } //check if its revoked -> Deny access

        const xForwardedFor = req.headers["x-forwarded-for"]; //check ip

        const clientIP = xForwardedFor
          ? xForwardedFor.split(",")[0].trim()
          : req.socket.remoteAddress;

        if (clientIP !== dbIP) {
          console.log("\n IP Mismatch");
          res.clearCookie("refreshToken");
          return res
            .status(401)
            .json({ ok: false, msg: "Unauthorized access" });
        } //check if ig its the same IP

        /**
         * Once here, client ip is the same that we have stored in our DB and token is not revoked.
         *
         * So, we revoke this refresh token and create another,
         * send it in the req, sign a new access_token and send it aswell
         */

        const revokedToken = await RefreshTokenModel.revokeToken(refreshToken); //revoke old refresh_token

        if (!revokedToken) throw new Error("Error revoking token");

        console.log("Old refresh token revoked... \n", revokedToken);

        const new_refresh_token = TokenUtil.signRefreshToken(
          user.id,
          user.email
        ); //sign new refresh_token

        const insertedToken = await RefreshTokenModel.insertToken(
          new_refresh_token,
          user.id,
          clientIP
        ); //save new refresh_token in DB

        if (!insertedToken) throw new Error("Error inserting new refreshToken");

        console.log("Inserted new refresh token on DB... \n", insertedToken);

        const new_access_token = TokenUtil.signAccessToken(user.id, user.email); //sign new access_token

        res.cookie("refreshToken", new_refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log("\n Refresh token cookie set...", new_refresh_token);

        res.setHeader("Authorization", `Bearer ${new_access_token}`); //setHeader authorization

        console.log("\n Access token header set...");

        console.log("Refreshed token");
        return next();
      } catch (error) {
        console.log("After token expired error, another error", error);
        res.clearCookie("refreshToken");
        return res.status(401).json({ ok: false, msg: "Access denied" });
      }
    }
    if (error.name === "JsonWebTokenError") {
      console.log(error);
      return res.status(401).json({
        ok: false,
        msg: "Access JWT not provided",
      });
    }

    console.log("Y este error?: ", error);
    //res.clearCookie("refreshToken");
    return res
      .status(400)
      .json({ ok: false, msg: "Where do you think you are going?" });
  }
};
