import { Request, Response, NextFunction } from "express";
import logging from "../../config/logging";
import bcryptjs from "bcryptjs";
import { Client } from "pg";
import config from "../../config/config";
const NAMESPACE = "Auth";
const selectAllQuery = "select * from users";
const addUserPasswordQuery = "";
const text =
  "INSERT INTO users(username, password) VALUES('salut', 'michel') RETURNING *";
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Token validated authorized");

  return res.status(200).json({
    message: "Authorized",
  });
};

export const register = (req: Request, res: Response, next: NextFunction) => {
  // on recoit les données de l'inscription
  const { username, password } = req.body;
  bcryptjs.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
        error: err,
      });
    }
    const client = new Client(config.postgres);
    client.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
    client.query(selectAllQuery, (err, res) => {
      if (!err) {
        console.log(res.rows);
      } else {
        console.error(err.message);
      }
    });
  });
  // erreur lors de l'ecriture du hash
};
