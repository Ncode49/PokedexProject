import { Request, Response } from "express";
import {
  createCatchErrorMessage,
  createErrorMessage,
} from "../../services/Error";
import { RefreshTokenServiceType } from "./refreshTokenService";

export const refreshTokenController =
  (refreshTokenService: RefreshTokenServiceType) =>
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token === undefined)
        return res
          .status(400)
          .json(createErrorMessage("token is undefined unauthorized"));
      const tokenOrError = refreshTokenService.refreshToken(token);
      if (typeof tokenOrError === "string")
        return res.status(200).json({ accessToken: tokenOrError });
      return res.status(400).json(tokenOrError);
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error));
    }
  };
