import jwt from "jsonwebtoken";
import config from "../../config/config";
import { createCatchErrorMessage, ErrorS } from "../Error";
export type TokenServiceType = {
  generateAccessToken: (user: string) => TokenS | ErrorS;
  generateRefreshToken: (user: string) => TokenS | ErrorS;
  verifyRefreshToken: (token: string) => PayloadS | ErrorS;
};

export const tokenService = (): TokenServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
  };
};
export type TokenS = {
  type: "success";
  token: string;
};

export type PayloadS = {
  type: "success";
  payload: Payload;
};

export type Payload = {
  username: string;
};
const verifyRefreshToken = (token: string): PayloadS | ErrorS => {
  jwt.verify(token, config.server.token.refreshTokenSecret, (err, _user) => {
    if (err)
      return {
        message: err.message,
      };
  });
  const decoded = jwt.decode(token) as Payload;
  return {
    type: "success",
    payload: decoded,
  };
};

// durée de vie courte
const generateAccessToken = (user: string): TokenS | ErrorS => {
  try {
    const token = jwt.sign({ user }, config.server.token.accessTokenSecret, {
      algorithm: "HS256",
      expiresIn: "1m",
    });
    return {
      type: "success",
      token: token,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};

// durée de vie longue
const generateRefreshToken = (user: string): TokenS | ErrorS => {
  try {
    const token = jwt.sign({ user }, config.server.token.refreshTokenSecret, {
      algorithm: "HS256",
      expiresIn: "1y",
    });
    return {
      type: "success",
      token: token,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};
