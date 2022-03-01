import { payload } from "./verifyRefreshToken";

export type TokenServiceType = {
  generateAccessToken: (user: string) => string;
  generateRefreshToken: (user: string) => string;
  verifyRefreshToken: (token: string) => payload;
};
