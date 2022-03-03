import {
  APIError,
  createCatchErrorMessage,
  CryptoServiceType,
  MessageS,
  TokenS,
  TokenServiceType,
  UserRType,
} from "../services";
type AccessRefreshTokenS = {
  type: "success";
  accessToken: string;
  refreshToken: string;
};
export type LoginResultType = Promise<APIError | AccessRefreshTokenS>;
export type RefreshTokenResultType = TokenS | APIError;
export type RegisterResultType = Promise<MessageS | APIError>;
export type AuthServiceType = {
  login: (username: string, password: string) => LoginResultType;
  register: (username: string, password: string) => RegisterResultType;
  refreshToken: (token: string) => RefreshTokenResultType;
};
export const AuthService = (
  userR: UserRType,
  cryptoService: CryptoServiceType,
  tokenService: TokenServiceType
) => {
  return {
    login: login(userR, cryptoService, tokenService),
    register: register(userR, cryptoService),
    refreshToken: refreshToken(tokenService),
  };
};

const login =
  (
    userR: UserRType,
    cryptoService: CryptoServiceType,
    tokenService: TokenServiceType
  ) =>
  async (username: string, password: string): LoginResultType => {
    try {
      const data = await userR.getPasswordByUsername(username, password);
      if (data.type === "error") return data;
      const message = await cryptoService.compareHash(password, data.password);
      if (message.type === "error") return message;
      if (!message.bool) {
        const err: APIError = {
          type: "error",
          message: "password incorrect",
        };
        return err;
      }
      const accessTokenResult = tokenService.generateAccessToken(username);
      if (accessTokenResult.type === "error") return accessTokenResult;
      const refreshTokenResult = tokenService.generateRefreshToken(username);
      if (refreshTokenResult.type === "error") return refreshTokenResult;
      // obliger pour typer le retour
      const success: AccessRefreshTokenS = {
        type: "success",
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token,
      };
      return success;
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };

const refreshToken =
  (tokenService: TokenServiceType) =>
  (token: string): RefreshTokenResultType => {
    try {
      const payload = tokenService.verifyRefreshToken(token);
      if (payload.type === "error") return payload;
      return tokenService.generateAccessToken(payload.payload.username);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
const register =
  (userR: UserRType, cryptoService: CryptoServiceType) =>
  async (username: string, password: string): RegisterResultType => {
    try {
      const hashResult = await cryptoService.hashPassword(password);
      if (hashResult.type == "error") return hashResult;
      return await userR.addUser(username, hashResult.hash);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
