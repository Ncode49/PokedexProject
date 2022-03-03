import bcryptjs from "bcryptjs";
import { createCatchErrorMessage, APIError } from "../Error";
type HashS = {
  type: "success";
  hash: string;
};
type BoolS = {
  type: "success";
  bool: boolean;
};

export type CompareHashResultType = Promise<BoolS | APIError>;
export type HashPasswordResultType = Promise<HashS | APIError>;
export type CryptoServiceType = {
  compareHash: (password: string, hash: string) => CompareHashResultType;
  hashPassword: (password: string) => HashPasswordResultType;
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
): CompareHashResultType => {
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

const hashPassword = async (password: string): HashPasswordResultType => {
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
