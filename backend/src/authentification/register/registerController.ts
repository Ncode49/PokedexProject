// prend en paramaetre les méthode qui renvoit un service

import { Request, Response } from "express";
import { CryptoServiceType } from "../../services/cryptoService/CryptoServiceType";
import { QueryServiceType } from "../../services/queryService/QueryServiceType";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export const register =
  (queryService: QueryServiceType, cryptoService: CryptoServiceType) =>
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const hash = await cryptoService.hashPassword(password);
      const message = await queryService.addUser(username, hash);
      return res.status(400).json(message);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({
        error: err,
        message: err.message,
      });
    }
  };
