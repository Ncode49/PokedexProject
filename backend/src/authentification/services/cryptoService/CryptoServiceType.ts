import { Message } from "../registerService/registerService";
import { Hash } from "./hashPassword";

export type cryptoServiceType = {
  compareHash: (password: string, hash: string) => Promise<Message>;
  hashPassword: (password: string) => Promise<Hash>;
};
