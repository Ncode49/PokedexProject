import { Message } from "../Message";
import { Hash } from "./hashPassword";

export type CryptoServiceType = {
  compareHash: (password: string, hash: string) => Promise<Message>;
  hashPassword: (password: string) => Promise<Hash>;
};
