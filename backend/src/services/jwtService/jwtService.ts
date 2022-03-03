import jwt from "jsonwebtoken";
import config from "../../config/config";
import { createCatchErrorMessage, APIError } from "../Error";
export type GenerateToken = TokenS | APIError;
export type GenerateAccessTokenResultType = GenerateToken;
export type GenerateRefreshTokenResultType = GenerateAccessTokenResultType;
export type VerifyAccessTokenResultType = PayloadS | APIError;
type SignOptions = jwt.SignOptions;
type VerifyTokenResultType = VerifyRefreshTokenResultType;
type VerifyRefreshTokenResultType = VerifyAccessTokenResultType;
export type JWTServiceType = {
  generateAccessToken: (user: string) => GenerateAccessTokenResultType;
  generateRefreshToken: (user: string) => GenerateRefreshTokenResultType;
  verifyRefreshToken: (token: string) => VerifyRefreshTokenResultType;
  verifyAccessToken: (token: string) => VerifyAccessTokenResultType;
};

export const JWTService = (): JWTServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
    verifyAccessToken: verifyAccessToken,
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

export type TokenOptions = {
  algorithm: string;
  expiresIn: string;
};

export type Payload = {
  username: string;
};
const verifyToken = (token: string, secret: string): VerifyTokenResultType => {
  try {
    jwt.verify(token, secret);
    const decoded = jwt.decode(token) as Payload;
    return {
      type: "success",
      payload: decoded,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};

const verifyRefreshToken = (token: string): VerifyRefreshTokenResultType => {
  return verifyToken(token, config.server.token.refreshTokenSecret);
};

const verifyAccessToken = (token: string): VerifyRefreshTokenResultType => {
  return verifyToken(token, config.server.token.accessTokenSecret);
};

const generateToken = (
  user: string,
  config: string,
  tokenOptions: SignOptions
): GenerateToken => {
  try {
    const token = jwt.sign({ user }, config, tokenOptions);
    return {
      type: "success",
      token: token,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};
// durée de vie courte
export const generateAccessToken = (
  user: string
): GenerateAccessTokenResultType => {
  return generateToken(user, config.server.token.accessTokenSecret, {
    algorithm: "HS256",
    expiresIn: "1y",
  });
};

// durée de vie longue
export const generateRefreshToken = (
  user: string
): GenerateRefreshTokenResultType => {
  return generateToken(user, config.server.token.refreshTokenSecret, {
    algorithm: "HS256",
    expiresIn: "1y",
  });
};
