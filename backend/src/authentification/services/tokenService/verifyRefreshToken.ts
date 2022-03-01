import jwt from "jsonwebtoken";
import config from "../../../config/config";

export type payload = {
  username: string;
};
export const verifyRefreshToken = (token: string) => {
  jwt.verify(token, config.server.token.refreshTokenSecret, (err, user) => {
    if (err) return { message: err.message };
  });
  const decoded = jwt.decode(token) as payload;
  return decoded;
};
