import { Pool } from "pg";
import { createCatchErrorMessage, APIError } from "../Error";
export interface IUser {
  username: string;
  password: string;
}
export type GetPasswordByUsernameResultType = Promise<APIError | PasswordS>;
export type AddUserResultType = Promise<MessageS | APIError>;
export type UserRType = {
  addUser: (username: string, password: string) => AddUserResultType;
  getPasswordByUsername: (
    username: string,
    password: string
  ) => GetPasswordByUsernameResultType;
};

export const UserR = (pool: Pool): UserRType => {
  return {
    addUser: addUser(pool),
    getPasswordByUsername: getPasswordByUsername(pool),
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
// transaction((client) => client.query({text: ...., values: [...]}))

const addUser =
  (pool: Pool) =>
  async (username: string, hash: string): AddUserResultType => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query({
        text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
        values: [username, hash],
      });
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

const getPasswordByUsername =
  (pool: Pool) =>
  async (username: string): GetPasswordByUsernameResultType => {
    const client = await pool.connect();
    try {
      const query = {
        text: "SELECT *  FROM users WHERE username = $1",
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
// mettre les query dans le userR
// Appel de service par le middleware
// abstraction des transactions
