import { Client } from "pg";
import { IUser, QueryBdd } from "../../../postgre/query";
import { Message } from "../registerService/registerService";

export const findUser =
  (client: Client) =>
  async (query: QueryBdd): Promise<Message> => {
    try {
      client.connect();
      const data = await client.query<IUser>(query);
      const users = data.rows;
      if (users.length == 0)
        return { message: "l'utilisateur n'existe pas en base de données" };
      return { message: "l'utilisateur a été trouvé" };
    } catch (error) {
      const err = error as Error;
      return { message: err.message };
    } finally {
      client.end();
    }
  };
