import { AutnControllerDeps } from "./AuthControllerDeps";
import { AuthControllerType } from "./AuthControllerType";
import { register } from "./controllers/registerController";
import { validateToken } from "./controllers/validateController";

// // definition du controller principal
export const AuthControllerDI = (
  deps: AutnControllerDeps
): AuthControllerType => {
  return {
    register: register(deps.registerService),
    login : login(deps.queryService, deps.cryptoService,deps.tokenService)
    validateToken: validateToken,
  };
};
