import { Request, Response } from "express";

import { QueryServiceType } from "../../services/queryService/QueryService";
import { CryptoServiceType } from "../../services/cryptoService/CryptoService";
import { TokenServiceType } from "../../services/tokenService/tokenService";
import { createCatchErrorMessage, ErrorS } from "../../services/Error";
export const loginService = (
  queryService: QueryServiceType,
  cryptoService: CryptoServiceType,
  tokenService: TokenServiceType
) => {
  return {
    login: login(queryService, cryptoService, tokenService),
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
    queryService: QueryServiceType,
    cryptoService: CryptoServiceType,
    tokenService: TokenServiceType
  ) =>
  async (username: string, password: string) => {
    try {
      const data = await queryService.findUser(username, password);
      const message = await cryptoService.compareHash(password, data.password);

      const accessToken = tokenService.generateAccessToken(username);
      const refreshToken = tokenService.generateRefreshToken(username);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      createCatchErrorMessage(error);
    }
  };
