import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config/config";
export const refreshToken = (req: Request, res: Response) => {
  // get the token
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
    // Algo(header + payload + cle secrete)
    jwt.verify(
      token,
      config.server.token.refreshTokenSecret,
      (error, payload) => {
        if (error) {
          // token incorrect
          return res.status(401).json({
            message: error.message,
            error: error,
          });
        }
        // TODO verifier que l'utilisateur est toujours en bdd a toujours les droits
        // on teste ici que le user existe toujours
      }
    );
  }
  // pas de token donc pas authorisé
  else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  return res.status(200).json({
    message: "refreshToken ok",
  });
};
