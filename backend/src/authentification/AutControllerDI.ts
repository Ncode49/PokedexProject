import { ValidateTokenControllerType } from "./ValidateToken/ValidateTokenController";
import { RefreshTokenControllerType } from "./RefreshToken/RefreshTokenController";
import { LoginControllerType } from "./Login/LoginController";
import { RegisterControllerType } from "./Register/RegisterController";

export type AuthControllerType = {
  register: RegisterControllerType;
  login: LoginControllerType;
  refreshToken: RefreshTokenControllerType;
  validateToken: ValidateTokenControllerType;
};

export const AuthControllerDI = (
  registerController: RegisterControllerType,
  loginController: LoginControllerType,
  refreshTokenController: RefreshTokenControllerType,
  validateTokenController: ValidateTokenControllerType
): AuthControllerType => {
  return {
    register: registerController,
    login: loginController,
    refreshToken: refreshTokenController,
    validateToken: validateTokenController,
  };
};
