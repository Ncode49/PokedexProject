import { Request, Response, NextFunction } from "express";
import logging from "../../../config/logging";
import bcryptjs from "bcryptjs";
import { Client } from "pg";
import config from "../../../config/config";
import { addUserPasswordQuery } from "../../postgre/query";
const NAMESPACE = "Auth register";
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
  bcryptjs.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
        error: err,
      });
    }

    const client = new Client(config.postgres);
    const query = {
      text: addUserPasswordQuery,
      values: [username, hash],
    };

    let message = "";
    try {
      await client.connect();
      const res = await client.query(query);
    } catch (error) {
      const err = error as Error;
      message = err.message;
    } finally {
      client.end();
    }

    return res.status(200).json({
      message: message,
    });
  });
};
