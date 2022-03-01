import bcryptjs from "bcryptjs";
import { createCatchErrorMessage, ErrorS } from "../Error";
export type Hash = string;
export type CryptoServiceType = {
  compareHash: (password: string, hash: string) => Promise<boolean | ErrorS>;
  hashPassword: (password: string) => Promise<Hash | ErrorS>;
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
): Promise<boolean | ErrorS> => {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};

const hashPassword = async (password: string): Promise<Hash | ErrorS> => {
  try {
    return await bcryptjs.hash(password, 10);
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};
