import jwt from "jsonwebtoken";
import config from "../../config/config";

// durée de vie courte
export const generateAccessToken = (user: string) => {
  return jwt.sign({ user }, config.server.token.accessTokenSecret, {
    algorithm: "HS256",
    expiresIn: "1m",
  });
};

// durée de vie longue
export const generateRefreshToken = (user: string) => {
  return jwt.sign(user, config.server.token.accessTokenSecret, {
    algorithm: "HS256",
    expiresIn: "1y",
  });
};
