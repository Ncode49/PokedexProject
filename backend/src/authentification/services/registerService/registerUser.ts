import bcryptjs from "bcryptjs";
import { addUserPasswordQuery } from "../../../postgre/query";
import { QueryServiceType } from "../queryService/QueryServiceType";
export type Message = {
  message: string;
};

export const registerUser =
  (queryService: QueryServiceType) =>
  async (username: string, password: string): Promise<Message> => {
    try {
      const hash = await bcryptjs.hash(password, 10);
      const query = {
        text: addUserPasswordQuery,
        values: [username, hash],
      };
      // service pour interaction bdd
      const mess = await queryService.addUser(query);
      return { message: mess.message };
    } catch (error) {
      const err = error as Error;
      return {
        message: err.message,
      };
    }
    return {
      message: `le client ${username} a été correctemnt enregistré en base de données,`,
    };
  };
