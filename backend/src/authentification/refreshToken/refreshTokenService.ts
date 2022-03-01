import {
  createCatchErrorMessage,
  createErrorMessage,
  ErrorS,
} from "../../services/Error";
import {
  Token,
  TokenServiceType,
} from "../../services/tokenService/tokenService";
export type AccessToken = {
  accessToken: string;
};
export type RefreshTokenServiceType = {
  refreshToken: (token: string) => Token | ErrorS;
};
export const refreshTokenService = (tokenservice: TokenServiceType) => {
  return {
    refreshToken: refreshToken(tokenservice),
  };
};

const refreshToken =
  (tokenService: TokenServiceType) =>
  (token: Token): Token | ErrorS => {
    try {
      const payload = tokenService.verifyRefreshToken(token);
      if ("username" in payload) {
        return tokenService.generateAccessToken(payload.username);
      }
      if ("message" in payload) return payload;
      return createErrorMessage("error refreshToken");
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
