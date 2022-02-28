import { Client } from "pg";
import bcryptjs from "bcryptjs";
import { addUserPasswordQuery } from "../../../postgre/query";
import { queryService } from "../queryService";
export type Message = {
  message: string;
};

export const registerUser = async (
  client: Client,
  username: string,
  password: string
): Promise<Message> => {
  try {
    const hash = await bcryptjs.hash(password, 10);
    const query = {
      text: addUserPasswordQuery,
      values: [username, hash],
    };
    // service pour interaction bdd
    await queryService(client, query);
  } catch (error) {
    const err = error as Error;
    await client.end();
    return {
      message: err.message,
    };
  }
  return {
    message: `le client ${username} a été correctemnt enregistré en base de données,`,
  };
};
