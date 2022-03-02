"use strict";
// prend en paramaetre les méthode qui renvoit un service
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.RegisterService = void 0;
const Error_1 = require("../../services/Error");
const RegisterService = (userR, cryptoService) => {
    return {
        register: (0, exports.register)(userR, cryptoService),
    };
};
exports.RegisterService = RegisterService;
const register = (userR, cryptoService) => async (username, password) => {
    try {
        const hashOrError = await cryptoService.hashPassword(password);
        if (hashOrError.type == "error")
            return hashOrError;
        return await userR.addUser(username, hashOrError.hash);
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
exports.register = register;
