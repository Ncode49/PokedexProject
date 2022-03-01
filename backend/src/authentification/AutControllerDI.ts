import { AutnControllerDeps } from "./AuthControllerDeps";
import { AuthControllerType } from "./AuthControllerType";
import { register } from "./controllers/registerController";
import { validateToken } from "./controllers/validateController";
import { login } from "./controllers/loginController";
import { refreshToken } from "./controllers/refreshTokenController";
// // definition du controller principal
export const AuthControllerDI = (
  deps: AutnControllerDeps
): AuthControllerType => {
  return {
    register: register(deps.queryService, deps.cryptoService),
    login: login(deps.queryService, deps.cryptoService, deps.tokenService),
    refreshToken: refreshToken(deps.tokenService),
    validateToken: validateToken,
  };
};
