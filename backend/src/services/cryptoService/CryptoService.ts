import { Message } from "../ServiceType/Message";
import { ServiceReturn } from "../ServiceType/Result";

export type CryptoServiceType = {
  compareHash: (password: string, hash: string) => Promise<Message>;
  hashPassword: (password: string) => Promise<Hash>;
};

export const cryptService = () => {
  return {
    hashPassword: hashPassword,
    compareHash: compareHash,
  };
};

const compareHash = async (
  password: string,
  hash: string
): Promise<Message> => {
  const valid = await bcryptjs.compare(password, hash);
  if (valid) return { message: "mot de passe correct" };
  return { message: "mot de passe incorrect" };
};

export type Hash = string;
const hashPassword = async (
  password: string
): Promise<ServiceReturn<Hash, Message>> => {
  try {
    const hash = await bcryptjs.hash(password, 10);
    return hash;
  } catch (error) {
    const err = error as Error;
    return {
      message: err.message,
    };
  }
};
