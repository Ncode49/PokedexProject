import bcryptjs from "bcryptjs";
import { createCatchErrorMessage, ErrorS } from "../Error";
type HashS = {
  type: "success";
  hash: string;
};
type BoolS = {
  type: "success";
  bool: boolean;
};
export type CryptoServiceType = {
  compareHash: (password: string, hash: string) => Promise<BoolS | ErrorS>;
  hashPassword: (password: string) => Promise<HashS | ErrorS>;
};

export const CryptService = (): CryptoServiceType => {
  return {
    hashPassword: hashPassword,
    compareHash: compareHash,
  };
};

const compareHash = async (
  password: string,
  hash: string
): Promise<BoolS | ErrorS> => {
  try {
    const bool = await bcryptjs.compare(password, hash);
    return {
      type: "success",
      bool: bool,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};

const hashPassword = async (password: string): Promise<HashS | ErrorS> => {
  try {
    const hash = await bcryptjs.hash(password, 10);
    return {
      type: "success",
      hash: hash,
    };
  } catch (error) {
    return createCatchErrorMessage(error);
  }
};
