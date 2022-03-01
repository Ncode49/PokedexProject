import { Client } from "pg";
import { Message } from "../ServiceType/Message";
import { addUser } from "./addUser";
import { findUser, Password } from "./findUser";
export interface QueryServiceDeps {
  client: Client;
}

export type QueryServiceType = {
  addUser: (username: string, password: string) => Promise<Message>;
  findUser: (username: string, password: string) => Promise<Message | Password>;
};

export const queryService = (deps: QueryServiceDeps): QueryServiceType => {
  return {
    addUser: addUser(deps.client),
    findUser: findUser(deps.client),
  };
};
