import {
  validateTokenController,
  ValidateTokenControllerType,
} from "./validateToken/validateTokenController";
import {
  refreshTokenController,
  RefreshTokenControllerType,
} from "./refreshToken/refreshTokenController";
import { loginController, LoginControllerType } from "./login/loginController";
import {
  registerController,
  registerControllerType,
} from "./register/registerController";
import { RegisterServiceType } from "./register/registerService";
import { LoginServiceType } from "./login/loginService";
import { RefreshTokenServiceType } from "./refreshToken/refreshTokenService";
// // definition du controller principal
// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  registerService: RegisterServiceType;
  loginService: LoginServiceType;
  refreshTokenService: RefreshTokenServiceType;
}
export type AuthControllerType = {
  register: registerControllerType;
  login: LoginControllerType;
  refreshToken: RefreshTokenControllerType;
  validateToken: ValidateTokenControllerType;
};

export const AuthControllerDI = (
  registerService: RegisterServiceType,
  loginService: LoginServiceType,
  refreshTokenService: RefreshTokenServiceType
): AuthControllerType => {
  return {
    register: registerController(registerService),
    login: loginController(loginService),
    refreshToken: refreshTokenController(refreshTokenService),
    validateToken: validateTokenController,
  };
};
