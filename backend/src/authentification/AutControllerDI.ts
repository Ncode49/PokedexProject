import {
  RegisterControllerType,
  LoginControllerType,
  RefreshTokenControllerType,
  ValidateTokenControllerType,
} from ".";

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
