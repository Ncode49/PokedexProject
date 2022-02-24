import { NextFunction, Request, Response } from "express";
import { Client } from "pg";
import config from "../../../config/config";
import { findUserByUsername } from "../../postgre/query";
import bcryptjs from "bcryptjs";
import { IUser } from "../../interface/IUser";
import jwt from "jsonwebtoken";
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
  } catch (error) {
    return res.status(400).json({
      message: "erreur",
    });
  }
  // payload, secret sign for it
  jwt.sign(
    { username: username },
    config.server.token.secret,
    {
      algorithm: "HS256",
      expiresIn: "1m",
    },
    (err, token) => {
      if (err) {
        return res.status(400).json({
          message: "error token creation",
        });
      }
      // the token will be fetch and add to the localsotrage in the client side
      return res.status(200).json({
        message: "password ok",
        token: token,
      });
    }
  );
};
