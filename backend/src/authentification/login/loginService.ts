import { Request, Response } from "express";

import { UserRType } from "../../services/UserR/UserR";
import { CryptoServiceType } from "../../services/cryptoService/CryptoService";
import { TokenServiceType } from "../../services/tokenService/TokenService";
import { createCatchErrorMessage, ErrorS } from "../../services/Error";
export const loginService = (
  userR: UserRType,
  cryptoService: CryptoServiceType,
  tokenService: TokenServiceType
) => {
  return {
    login: login(userR, cryptoService, tokenService),
  };
};
export type AccessRefreshToken = {
  accesstoken: string;
  refreshToken: string;
};
export type LoginServiceType = {
  login: (username: string, password: string) => ErrorS | AccessRefreshToken;
};

export const login =
  (
    userR: UserRType,
    cryptoService: CryptoServiceType,
    tokenService: TokenServiceType
  ) =>
  async (username: string, password: string) => {
    try {
      const data = await userR.findUser(username, password);
      if (data.type === "error") return data;
      const message = await cryptoService.compareHash(password, data.password);
      if (message.type === "error") return message;
      const accessToken = tokenService.generateAccessToken(username);
      if (accessToken.type === "error") return accessToken;
      const refreshToken = tokenService.generateRefreshToken(username);
      if (refreshToken.type === "error") return refreshToken;
      return {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
      };
    } catch (error) {
      createCatchErrorMessage(error);
    }
  };
