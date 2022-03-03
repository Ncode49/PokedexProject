// take token,
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { createErrorMessage } from "../../services";
// 401 unauthorized
export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ type: "error", message: "no token in header" });
  jwt.verify(
    token,
    config.server.token.accessTokenSecret as string,
    (err, _user) => {
      if (err) return res.status(403).json(err.message);
      next();
    }
  );
};
