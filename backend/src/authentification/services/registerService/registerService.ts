import { RegisterServiceType } from "./RegisterServiceType";
import { RegisterServiceDeps } from "./RegisterServiceDeps";
import { registerUser } from "./registerUser";
export type Message = {
  message: string;
};

export const registerService = (): RegisterServiceType => {
  return {
    registerUser: registerUser,
  };
};
