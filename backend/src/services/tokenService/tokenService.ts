import jwt from "jsonwebtoken";
import config from "../../config/config";
import { ErrorS } from "../ServiceType/Result";
export type TokenServiceType = {
  generateAccessToken: (user: string) => Token | ErrorS;
  generateRefreshToken: (user: string) => Token | ErrorS;
  verifyRefreshToken: (token: string) => Payload | ErrorS;
};

export const tokenService = (): TokenServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
  };
};
export type Token = string;

export type Payload = {
  username: string;
};
const verifyRefreshToken = (token: string): Payload | ErrorS => {
  jwt.verify(token, config.server.token.refreshTokenSecret, (err, _user) => {
    if (err)
      return {
        message: err.message,
      };
  });
  const decoded = jwt.decode(token) as Payload;
  return decoded;
};

// durée de vie courte
const generateAccessToken = (user: string): Token | ErrorS => {
  try {
    return jwt.sign({ user }, config.server.token.accessTokenSecret, {
      algorithm: "HS256",
      expiresIn: "1m",
    });
  } catch (error) {
    const err = error as Error;
    return {
      message: err.message,
    };
  }
};

// durée de vie longue
const generateRefreshToken = (user: string): Token | ErrorS => {
  try {
    return jwt.sign({ user }, config.server.token.refreshTokenSecret, {
      algorithm: "HS256",
      expiresIn: "1y",
    });
  } catch (error) {
    const err = error as Error;
    return {
      message: err.message,
    };
  }
};
