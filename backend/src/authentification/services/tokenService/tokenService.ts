import { generateAccessToken, generateRefreshToken } from "./generateToken";
import { TokenServiceType } from "./TokenServiceType";

export const tokenService = (): TokenServiceType => {
  return {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
  };
};
