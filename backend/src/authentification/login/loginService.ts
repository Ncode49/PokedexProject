import {
  UserRType,
  CryptoServiceType,
  TokenServiceType,
  ErrorS,
  createCatchErrorMessage,
} from "../../services";

export const LoginService = (
  userR: UserRType,
  cryptoService: CryptoServiceType,
  tokenService: TokenServiceType
): LoginServiceType => {
  return {
    login: login(userR, cryptoService, tokenService),
  };
};
export type AccessRefreshTokenS = {
  type: "success";
  accessToken: string;
  refreshToken: string;
};
export type LoginServiceType = {
  login: (
    username: string,
    password: string
  ) => Promise<ErrorS | AccessRefreshTokenS>;
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
      if (!message.bool) {
        const err: ErrorS = {
          type: "error",
          message: "password incorrect",
        };
        return err;
      }
      const accessToken = tokenService.generateAccessToken(username);
      if (accessToken.type === "error") return accessToken;
      const refreshToken = tokenService.generateRefreshToken(username);
      if (refreshToken.type === "error") return refreshToken;
      // obliger pour typer le retour
      const success: AccessRefreshTokenS = {
        type: "success",
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
      };
      return success;
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
