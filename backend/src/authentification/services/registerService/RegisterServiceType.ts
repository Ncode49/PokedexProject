import { Message } from "./registerService";

export type RegisterServiceType = {
  registerUser: (username: string, password: string) => Promise<Message>;
};
