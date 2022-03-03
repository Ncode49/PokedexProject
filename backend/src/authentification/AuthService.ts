import {
  APIError,
  createCatchErrorMessage,
  CryptoServiceType,
  MessageS,
  TokenS,
  JWTServiceType,
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
  jwtService: JWTServiceType
) => {
  return {
    login: login(userR, cryptoService, jwtService),
    register: register(userR, cryptoService),
    refreshToken: refreshToken(jwtService),
  };
};

const login =
  (
    userR: UserRType,
    cryptoService: CryptoServiceType,
    jwtService: JWTServiceType
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
      const accessTokenResult = jwtService.generateAccessToken(username);
      if (accessTokenResult.type === "error") return accessTokenResult;
      const refreshTokenResult = jwtService.generateRefreshToken(username);
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
  (jwtService: JWTServiceType) =>
  (token: string): RefreshTokenResultType => {
    try {
      const payload = jwtService.verifyRefreshToken(token);
      if (payload.type === "error") return payload;
      return jwtService.generateAccessToken(payload.payload.username);
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
      return userR.addUser(username, hashResult.hash);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
