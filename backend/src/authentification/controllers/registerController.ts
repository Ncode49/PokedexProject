// prend en paramaetre les méthode qui renvoit un service

import { Client } from "pg";
import { Request, Response } from "express";
import { RegisterServiceType } from "../services/registerService/RegisterServiceType";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export const register =
  (client: Client, registerService: RegisterServiceType) =>
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const { message } = await registerService.registerUser(
        client,
        username,
        password
      );
      return res.status(400).json({
        message: message,
      });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({
        error: err,
        message: err.message,
      });
    }
  };
