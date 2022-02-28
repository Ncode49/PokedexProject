import { Client } from "pg";
import { Message } from "./registerService";

export type RegisterServiceType = {
  registerUser: (
    client: Client,
    username: string,
    password: string
  ) => Promise<Message>;
};
