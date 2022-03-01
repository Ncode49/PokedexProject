import { CryptoServiceType } from "../services/cryptoService/CryptoServiceType";
import { QueryServiceType } from "../services/queryService/QueryServiceType";
import { TokenServiceType } from "../services/tokenService/TokenServiceType";
import { Request, Response } from "express";
import { Message } from "../services/Message";
import { Password } from "../services/queryService/findUser";
const isMessage = (data: Password | Message): data is Message => {
  return (data as Message).message !== undefined;
};
const isValid = (message: Message) => {
  if (message.message === "mot de passe incorrect") return false;
  return true;
};
export const login =
  (
    queryService: QueryServiceType,
    cryptoService: CryptoServiceType,
    tokenService: TokenServiceType
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const data = await queryService.findUser(username, password);
      if (isMessage(data)) {
        return res.status(400).json(data);
      }
      const hash = data.password;
      const message = await cryptoService.compareHash(password, hash);
      if (!isValid(message)) return res.status(400).json(message);

      const accessToken = tokenService.generateAccessToken(username);
      const refreshToken = tokenService.generateRefreshToken(username);
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({
        message: err.message,
      });
    }
  };
