import jwt from "jsonwebtoken";
import config from "../../config/config";
import { createCatchErrorMessage, APIError } from "../Error";
export type GenerateAccessTokenResultType = TokenS | APIError;
export type GenerateRefreshTokenResultType = TokenS | APIError;
export type VerifyRefreshTokenResultType = PayloadS | APIError;
export type TokenServiceType = {
  generateAccessToken: (user: string) => GenerateAccessTokenResultType;
  generateRefreshToken: (user: string) => GenerateRefreshTokenResultType;
  verifyRefreshToken: (token: string) => VerifyRefreshTokenResultType;
};

export const TokenService = (): TokenServiceType => {
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
const verifyRefreshToken = (token: string): VerifyRefreshTokenResultType => {
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
export const generateAccessToken = (
  user: string
): GenerateAccessTokenResultType => {
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
export const generateRefreshToken = (
  user: string
): GenerateRefreshTokenResultType => {
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

// Logout générer deconnexion token
