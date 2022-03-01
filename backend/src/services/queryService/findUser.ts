import { Client } from "pg";
import { Message } from "../Message";
import { findUserByUsername, IUser } from "./query";
export type Password = {
  password: string;
};
export const findUser =
  (client: Client) =>
  async (username: string, password: string): Promise<Message | Password> => {
    try {
      client.connect();
      const query = {
        text: findUserByUsername,
        values: [username],
      };
      const data = await client.query<IUser>(query);
      const users = data.rows;
      if (users.length == 0)
        return { message: "l'utilisateur n'existe pas en base de données" };
      return { password: users[0].password };
    } catch (error) {
      const err = error as Error;
      return { message: err.message };
    } finally {
      client.end();
    }
  };
