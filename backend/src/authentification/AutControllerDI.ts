import {
  validateTokenController,
  ValidateTokenControllerType,
} from "./ValidateToken/ValidateTokenController";
import {
  refreshTokenController,
  RefreshTokenControllerType,
} from "./RefreshToken/RefreshTokenController";
import { LoginControllerType } from "./Login/LoginController";
import {
  registerController,
  registerControllerType,
} from "./Register/RegisterController";
import { RegisterServiceType } from "./Register/RegisterService";
import { LoginServiceType } from "./Login/LoginService";
import { RefreshTokenServiceType } from "./RefreshToken/RefreshTokenService";
import { UserRType } from "../services/UserR/UserR";
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
