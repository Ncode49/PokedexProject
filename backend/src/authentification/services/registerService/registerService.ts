import { RegisterServiceDeps } from "./RegisterServiceDeps";
import { RegisterServiceType } from "./RegisterServiceType";
import { registerUser } from "./registerUser";
export type Message = {
  message: string;
};

export const registerService = (
  deps: RegisterServiceDeps
): RegisterServiceType => {
  return {
    registerUser: registerUser(deps.queryService),
  };
};
