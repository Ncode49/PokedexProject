import { Client } from "pg";
import { createCatchErrorMessage, ErrorS } from "../Error";
import { addUserPasswordQuery, findUserByUsername, IUser } from "./UserQuery";

export interface UserRDeps {
  client: Client;
}

export type UserRType = {
  addUser: (username: string, password: string) => Promise<MessageS | ErrorS>;
  findUser: (username: string, password: string) => Promise<PasswordS | ErrorS>;
};

export const UserR = (deps: UserRDeps): UserRType => {
  return {
    addUser: addUser(deps.client),
    findUser: findUser(deps.client),
  };
};

export type MessageS = {
  type: "success";
  message: string;
};

export type PasswordS = {
  type: "success";
  password: string;
};
export const addUser =
  (client: Client) =>
  async (username: string, hash: string): Promise<MessageS | ErrorS> => {
    try {
      await client.connect();
      const query = {
        text: addUserPasswordQuery,
        values: [username, hash],
      };
      await client.query(query);
      return {
        type: "success",
        message: "l'utilisateur a été enregistré en bdd",
      };
    } catch (error) {
      return createCatchErrorMessage(error);
    } finally {
      client.end();
      console.log("client déconnecté");
    }
  };

export const findUser =
  (client: Client) =>
  async (username: string, password: string): Promise<ErrorS | PasswordS> => {
    try {
      client.connect();
      const query = {
        text: findUserByUsername,
        values: [username],
      };
      const data = await client.query<IUser>(query);
      const users = data.rows;
      if (users.length == 0)
        return {
          type: "error",
          message: "l'utilisateur n'existe pas en base de données",
        };
      return { type: "success", password: users[0].password };
    } catch (error) {
      return createCatchErrorMessage(error);
    } finally {
      client.end();
    }
  };
