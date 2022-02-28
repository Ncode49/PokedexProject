import { Client } from "pg";
import { addUser } from "./addUser";
import { QueryServiceType } from "./QueryServiceType";

export const queryService = (client: Client): QueryServiceType => {
  return { addUser: addUser(client) };
};
