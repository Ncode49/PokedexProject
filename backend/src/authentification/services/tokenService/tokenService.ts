import { generateAccessToken, generateRefreshToken } from "./generateToken";
import { TokenServiceType } from "./TokenServiceType";
import { verifyRefreshToken } from "./verifyRefreshToken";

export const tokenService = (): TokenServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
  };
};
