"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.LoginService = void 0;
const services_1 = require("../../services");
const LoginService = (userR, cryptoService, tokenService) => {
  return {
    login: (0, exports.login)(userR, cryptoService, tokenService),
  };
};
exports.LoginService = LoginService;
// APIError => APIError
const login =
  (userR, cryptoService, tokenService) => async (username, password) => {
    try {
      const data = await userR.findUser(username, password);
      if (data.type === "error") return data;
      const message = await cryptoService.compareHash(password, data.password);
      if (message.type === "error") return message;
      if (!message.bool) {
        const err = {
          type: "error",
          message: "password incorrect",
        };
        return err;
      }
      const accessTokenResult = tokenService.generateAccessToken(username);
      if (accessTokenResult.type === "error") return accessTokenResult;
      const refreshTokenResult = tokenService.generateRefreshToken(username);
      if (refreshTokenResult.type === "error") return refreshTokenResult;
      // obliger pour typer le retour
      const success = {
        type: "success",
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token,
      };
      return success;
    } catch (error) {
      return (0, services_1.createCatchErrorMessage)(error);
    }
  };
exports.login = login;
