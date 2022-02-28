export type TokenServiceType = {
  generateAccessToken: (user: string) => string;
  generateRefreshToken: (user: string) => string;
};
