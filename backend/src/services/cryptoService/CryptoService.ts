import { compareHash } from "./compareHash";
import { hashPassword } from "./hashPassword";

export const cryptService = () => {
  return {
    hashPassword: hashPassword,
    compareHash: compareHash,
  };
};
