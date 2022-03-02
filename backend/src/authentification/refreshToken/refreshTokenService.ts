import {
  TokenS,
  ErrorS,
  TokenServiceType,
  createCatchErrorMessage,
} from "../../services";

export type AccessToken = {
  accessToken: string;
};

export type RefreshTokenServiceType = {
  refreshToken: (token: string) => TokenS | ErrorS;
};
export const RefreshTokenService = (tokenservice: TokenServiceType) => {
  return {
    refreshToken: refreshToken(tokenservice),
  };
};

const refreshToken =
  (tokenService: TokenServiceType) =>
  (token: string): TokenS | ErrorS => {
    try {
      const payload = tokenService.verifyRefreshToken(token);
      if (payload.type === "error") return payload;
      return tokenService.generateAccessToken(payload.payload.username);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
