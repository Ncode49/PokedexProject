// take token,
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createErrorMessage } from "../../services";
// 401 unauthorized
export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, _user) => {
    if (err) return res.sendStatus(403);
    next();
  });
  return res.status(401).json(createErrorMessage("No token UnAuthorized"));
};
