import { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import config from "../../config/config";
import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../functions/generateToken";
import jwt from "jsonwebtoken";
import { findUserByUsername } from "../../postgre/query";
import { IUser } from "../../interface/IUser";

type payload = {
  username: string;
};
export interface Authentification {
  register: (req: Request, res: Response, next: NextFunction) => any;
  login: (req: Request, res: Response, next: NextFunction) => any;
  refreshToken: (req: Request, res: Response, next: NextFunction) => any;
  validateToken: (req: Request, res: Response, next: NextFunction) => any;
}

export class AuthController implements Authentification {
  constructor() {}
  async register(req: Request, res: Response, next: NextFunction) {
    // on recoit les données du login
    const { username, password } = req.body;

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
  }
  async login(req: Request, res: Response, next: NextFunction) {
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
  }
  async refreshToken(req: Request, res: Response, next: NextFunction) {
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
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      message: "Token(s) validated",
    });
  }
}
