import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config/config";
import { generateAccessToken } from "../../functions/generateToken";
// route utilisé quand l'access token n'est plus valide
// on utilise cette route pour regénérer un access token en vérifiant que le refresh token est toujours valid

type payload = {
  username: string;
};

export const refreshToken = (req: Request, res: Response) => {
  // get the token
  const token = req.headers.authorization?.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // TODO Verifier que la personne a toujours les droits
  jwt.verify(token, config.server.token.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
        err: err,
      });
    }

    const decoded = jwt.decode(token) as payload;
    const accessToken = generateAccessToken(decoded.username);
    res.status(200).json({
      accessToken: accessToken,
    });
  });
};

type Success = {
  code: number;
  message?: string;
};

type Error = {
  code: number;
  message: string;
};

// 200 204 202
type Result<S, E> = {
  success?: S;
  error?: E;
};

const isSuccess = <S, E>(response: Result<S, E>): boolean => {
  if (response.success != undefined) return true;
  return false;
};
