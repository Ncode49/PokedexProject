import { Client } from "pg";
import { QueryBdd } from "../../../postgre/query";
import { Message } from "../registerService/registerService";

export const addUser =
  (client: Client) =>
  async (query: QueryBdd): Promise<Message> => {
    try {
      await client.connect();
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
