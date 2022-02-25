import { NextFunction, Request, Response } from "express";
import { Client } from "pg";
import config from "../../config/config";
import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../functions/generateToken";
import { findUserByUsername } from "../../postgre/query";
import { IUser } from "../../interface/IUser";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // on recoit les données du login
  const { username, password } = req.body;

  // requete pour récupérer les users
  // si on en a trouvé, on compare
  // si pas ok => password incorrect
  // sinon password correct
  // cree le token
  // test si token est correctement crée ou non
  // compare the data to the hash data

  const client = new Client(config.postgres);
  const query = {
    text: findUserByUsername,
    values: [username],
  };
  try {
    client.connect();

    const data = await client.query<IUser>(query);
    const users = data.rows;
    if (!users.length)
      return res.status(401).json({
        message: "l'username n'existe pas en base de données",
      });
    const valid = await bcryptjs.compare(password, users[0].password);
    if (!valid)
      return res.status(401).json({
        message: "password mismatched",
      });
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
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
