import { validationResult } from "express-validator";
import { AuthService } from "./../services/auth.service.js";
import { TokenUtil } from "../utils/token.util.js";
import { RefreshTokenService } from "../services/refreshToken.service.js";
import { ScoutService } from "../services/scout.service.js";
const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(401)
      .json({ ok: false, msg: "Invalid data", errors: errors.array() });

  try {
    const newUser = req.body;

    if (!newUser) throw new Error("User data not provided");
    //Hash password
    const hashedPassword = await TokenUtil.hashPassword(newUser.password);
    if (!hashedPassword) throw new Error("Error hashing password");
    newUser.password_hash = hashedPassword;

    const createdUser = await AuthService.createUser(newUser);
    if (!createdUser) throw new Error("User not created");

    const scoutProfile = {
      user_id: createdUser.id,
      full_name: createdUser.name,
      license_number: "",
      organization: "",
      email: createdUser.email,
    };

    const createdScoutProfile = await ScoutService.createScout(scoutProfile);
    if (!createdScoutProfile) {
      const error = new Error();
      error.name = "Scout profile not created";
      error.createdUser = createdUser;
      throw error;
    }

    return res.status(201).json({
      ok: true,
      msg: "Success creating user",
      createdUser: createdUser.email,
    });
  } catch (error) {
    console.log("[CON] Error registering user", error);

    if (error.createdUser || error.createdUser.id) {  
      await AuthService.deleteUser(error.createdUser.id);
    }

    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const login = async (req, res) => {
  const auto_log = res.locals.user;

  if (auto_log) {
    console.log("Auto logging...");
    return res.status(200).json({
      ok: true,
      msg: "Successfully auto logged",
    });
  }

  try {
    const loginUser = req.body;
    console.log("Login user:  \n", loginUser);
    if (!loginUser) throw new Error("User not provided");
    //checking user is in DB
    const checkedUser = await AuthService.getUserByEmail(loginUser.email);

    if (!checkedUser) throw new Error("Incorrect email or password");
    //compare passwords
    console.log("User checked...");
    const checkedPwd = await TokenUtil.comparePasswords(
      loginUser.password,
      checkedUser.password_hash
    );
    if (!checkedPwd) throw new Error("Incorrect email or password");
    console.log("Password checked...");

    const refreshToken = TokenUtil.signRefreshToken(
      checkedUser.id,
      checkedUser.email
    );

    const access_token = TokenUtil.signAccessToken(
      checkedUser.id,
      checkedUser.email
    );

    //check ip
    const xForwardedFor = req.headers["x-forwarded-for"];

    const clientIP = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : req.socket.remoteAddress;

    const inserted_refreshToken = await RefreshTokenService.insertToken(
      refreshToken,
      checkedUser.id,
      clientIP
    );
    if (!inserted_refreshToken)
      throw new Error("Error inserting refresh token");

    console.log("Inserted refresh token...");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Refresh token cookie set...");

    res.setHeader("Authorization", `Bearer ${access_token}`);

    console.log("Access token header set...");

    return res.status(200).json({ ok: true, msg: "Successfull login" });
  } catch (error) {
    if (error.message === "Incorrect email or password") {
      console.log(error.message);
      return res.status(400).json({ ok: false, msg: "User not recognized" });
    }
    console.log("Error loging user: ", error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const logout = async (req, res) => {
  const user_id = req.params;

  try {
    if (!user_id) throw new Error("User ID not provided");

    await RefreshTokenService.revokeToken(user_id);
    res.clearCookie("refresh_token");
    res.status(200).json({ ok: true, msg: "Token revoked" });
  } catch (error) {
    console.log("Error revoking token: ", error);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

export const AuthController = {
  register,
  login,
  logout,
};
