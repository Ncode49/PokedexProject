// prend en paramaetre les méthode qui renvoit un service

import { Client } from "pg";
import { Request, Response } from "express";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé

export const register = (client: Client) => (req: Request, res: Response) => {};
