import { Pool } from "pg";
import { createCatchErrorMessage, ErrorS } from "../Error";
import { addUserPasswordQuery, findUserByUsername, IUser } from "./UserQuery";

export type UserRType = {
  addUser: (username: string, password: string) => Promise<MessageS | ErrorS>;
  findUser: (username: string, password: string) => Promise<PasswordS | ErrorS>;
};

export const UserR = (pool: Pool): UserRType => {
  return {
    addUser: addUser(pool),
    findUser: findUser(pool),
  };
};

export type MessageS = {
  type: "success";
  message: string;
};

type PasswordS = {
  type: "success";
  password: string;
};
const addUser =
  (pool: Pool) =>
  async (username: string, hash: string): Promise<MessageS | ErrorS> => {
    const client = await pool.connect();
    try {
      const query = {
        text: addUserPasswordQuery,
        values: [username, hash],
      };
      await client.query("BEGIN");
      await client.query(query);
      await client.query("COMMIT");
      return {
        type: "success",
        message: "l'utilisateur a été enregistré en bdd",
      };
    } catch (error) {
      await client.query("ROLLBACK");
      return createCatchErrorMessage(error);
    } finally {
      client.release();
    }
  };

const findUser =
  (pool: Pool) =>
  async (username: string, password: string): Promise<ErrorS | PasswordS> => {
    const client = await pool.connect();
    try {
      const query = {
        text: findUserByUsername,
        values: [username],
      };
      await client.query("BEGIN");
      const { rows } = await client.query<IUser>(query);
      await client.query("COMMIT");
      const users = rows;
      if (users.length == 0)
        return {
          type: "error",
          message: "l'utilisateur n'existe pas en base de données",
        };
      return { type: "success", password: users[0].password };
    } catch (error) {
      await client.query("ROLLBACK");
      return createCatchErrorMessage(error);
    } finally {
      client.release();
    }
  };
