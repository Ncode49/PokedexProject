import {
  TokenS,
  APIError,
  TokenServiceType,
  createCatchErrorMessage,
} from "../../services";

export type AccessToken = {
  accessToken: string;
};
export type RefreshTokenResultType = TokenS | APIError;
export type RefreshTokenServiceType = {
  refreshToken: (token: string) => RefreshTokenResultType;
};
export const RefreshTokenService = (tokenservice: TokenServiceType) => {
  return {
    refreshToken: refreshToken(tokenservice),
  };
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
