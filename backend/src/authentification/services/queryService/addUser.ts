import { Client } from "pg";
import { QueryBdd } from "../../../postgre/query";
import { Message } from "../registerService/registerService";

export const addUser =
  (client: Client) =>
  async (query: QueryBdd): Promise<Message> => {
    try {
      await client.connect();
      const res = await client.query(query);
      await client.end();

      return { message: "l'utilisateur a ete enregistré" };
    } catch (error) {
      const err = error as Error;
      return { message: err.message };
    }
  };
