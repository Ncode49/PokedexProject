// take token,
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import logging from "../../config/logging";
const NAMESPACE = "Auth";
// 401 unauthorized
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validate Token");
  // Bearer token data form
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
    // Algo(header + payload + cle secrete)
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        // token incorrect
        return res.status(401).json({
          message: error.message,
          error: error,
        });
      } else {
        // create a 'jwt'= decoded that last the time of the request
        res.locals.jwt = decoded;
        // passe au prochain middleware
        next();
      }
    });
  }
  // pas de token donc pas authorisé
  else {
    return res.status(401).json({
      message: "UnAuthorized",
    });
  }
};

export default extractJWT;
