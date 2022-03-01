import { Message } from "../Message";
import { Password } from "./findUser";

export type QueryServiceType = {
  addUser: (username: string, password: string) => Promise<Message>;
  findUser: (username: string, password: string) => Promise<Message | Password>;
};
