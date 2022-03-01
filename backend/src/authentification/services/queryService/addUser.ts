import { Client } from "pg";
import { Message } from "../Message";
import { addUserPasswordQuery, QueryBdd } from "./query";

export const addUser =
  (client: Client) =>
  async (username: string, hash: string): Promise<Message> => {
    try {
      await client.connect();
      const query = {
        text: addUserPasswordQuery,
        values: [username, hash],
      };
      const res = await client.query(query);
      return { message: "l'utilisateur a été enregistré" };
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      return { message: err.message };
    } finally {
      client.end();
      console.log("client déconnecté");
    }
  };
