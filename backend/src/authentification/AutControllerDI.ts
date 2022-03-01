import { register } from "./register/registerController";
import {
  validateTokenController,
  validateTokenType,
} from "./validateToken/validateTokenController";
import { login } from "./login/loginController";
import { refreshToken } from "./refreshToken/refreshTokenController";
import { QueryServiceType } from "../services/queryService/QueryService";
import { TokenServiceType } from "../services/tokenService/tokenService";
import { CryptoServiceType } from "../services/cryptoService/CryptoService";
// // definition du controller principal
// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  queryService: QueryServiceType;
  tokenService: TokenServiceType;
  cryptoService: CryptoServiceType;
}
export type AuthControllerType = {
  register: (req: Request, res: Response) => void;
  login: (req: Request, res: Response) => void;
  refreshToken: (req: Request, res: Response) => void;
  validateToken: validateTokenType;
};

export const AuthControllerDI = (
  deps: AutnControllerDeps
): AuthControllerType => {
  return {
    register: register(deps.queryService, deps.cryptoService),
    login: login(deps.queryService, deps.cryptoService, deps.tokenService),
    refreshToken: refreshToken(deps.tokenService),
    validateToken: validateTokenController,
  };
};
