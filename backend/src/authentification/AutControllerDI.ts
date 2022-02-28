import { AutnControllerDeps } from "./AuthControllerDeps";
import { AuthControllerType } from "./AuthControllerType";
import { register } from "./controllers/registerController";

// // definition du controller principal
export const AuthControllerDI = (
  deps: AutnControllerDeps
): AuthControllerType => {
  return {
    register: register(deps.client, deps.registerService),
  };
};
