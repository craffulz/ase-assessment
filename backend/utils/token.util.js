import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "dotenv";

config();

const hashPassword = async (password) => {
  const hashed_password = await bcryptjs.hash(password, 10);
  return hashed_password;
};

const comparePasswords = async (password, hashed_password) => {
  const checked_password = await bcryptjs.compare(password, hashed_password);
  return checked_password;
};

const retrieveToken = async (bearer) => {
  const access_token = bearer.split(" ")[1];
  return access_token;
};

const verifyAccessToken = (access_token) => {
  const user = jwt.verify(access_token, process.env.JWT_SECRET);
  return user;
};

const verifyRefreshToken = (refresh_token) => {
  const user = jwt.verify(refresh_token, process.env.JWT_SECRET);
  return user;
};

const signRefreshToken = (id, email) => {
  const refresh_token = jwt.sign(
    { id: id, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "6d",
    }
  );
  return refresh_token;
};

const signAccessToken = (id, email) => {
  const access_token = jwt.sign(
    { id: id, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m",
    }
  );
  return access_token;
};

export const TokenUtil = {
  hashPassword,
  comparePasswords,
  retrieveToken,
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
};
