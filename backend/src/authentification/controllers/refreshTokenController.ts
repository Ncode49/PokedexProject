import { Request, Response } from "express";
import { TokenServiceType } from "../../services/tokenService/TokenServiceType";
import jwt from "jsonwebtoken";
type payload = {
  username: string;
};

export const refreshToken =
  (tokenService: TokenServiceType) => async (req: Request, res: Response) => {
    // get the token
    const token = req.headers.authorization?.split(" ")[1];

    if (token === undefined) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // TODO Verifier que la personne a toujours les droits
    const payload = tokenService.verifyRefreshToken(token);

    const accessToken = tokenService.generateAccessToken(payload.username);
    res.status(200).json({
      accessToken: accessToken,
    });
  };
