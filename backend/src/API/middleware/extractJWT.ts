// take token,
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import logging from "../../config/logging";
const NAMESPACE = "Auth";
// 401 unauthorized
export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validate Token");
  // Bearer token data form
  let token = req.headers.authorization?.split(" ")[1];
  // faire try and catch a la place
  if (token) {
    // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
    // Algo(header + payload + cle secrete)
    try {
      jwt.verify(token, config.server.token.accessTokenSecret);
      next();
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({
        message: err.message,
        error: error,
      });
    }
  }
  // pas de token donc pas authorisé
  else {
    return res.status(401).json({
      message: "No token UnAuthorized",
    });
  }
};
