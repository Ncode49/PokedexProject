import {
  UserRType,
  CryptoServiceType,
  TokenServiceType,
  ErrorS,
  createCatchErrorMessage,
} from "../../services";
export type AccessRefreshTokenS = {
  type: "success";
  accessToken: string;
  refreshToken: string;
};
export type LoginSErviceResultType = ErrorS | AccessRefreshTokenS;
export type LoginServiceType = {
  login: (
    username: string,
    password: string
  ) => Promise<LoginSErviceResultType>;
};

export const LoginService = (
  userR: UserRType,
  cryptoService: CryptoServiceType,
  tokenService: TokenServiceType
): LoginServiceType => {
  return {
    login: login(userR, cryptoService, tokenService),
  };
};
// ErrorS => APIError
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
