"use strict";
// prend en paramaetre les méthode qui renvoit un service
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.RegisterService = void 0;
const services_1 = require("../../services");
const RegisterService = (userR, cryptoService) => {
    return {
        register: (0, exports.register)(userR, cryptoService),
    };
};
exports.RegisterService = RegisterService;
const register = (userR, cryptoService) => async (username, password) => {
    try {
        const hashResult = await cryptoService.hashPassword(password);
        if (hashResult.type == "error")
            return hashResult;
        return await userR.addUser(username, hashResult.hash);
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
exports.register = register;
