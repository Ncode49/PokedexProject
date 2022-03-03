"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const services_1 = require("../services");
const AuthControllerDI = (authService) => {
    return {
        login: login(authService),
        register: register(authService),
        refreshToken: refreshToken(authService),
        validateToken: validateToken,
    };
};
exports.AuthControllerDI = AuthControllerDI;
// authcontroller.register(service a utiliser par a injecter par AuthService) qui sont les méthodes a utiliser
const login = (authService) => async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await authService.login(username, password);
        if (data.type == "error")
            return res.status(400).json(data);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json((0, services_1.createCatchErrorMessage)(error));
    }
};
const refreshToken = (authService) => async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined)
            return res
                .status(400)
                .json((0, services_1.createErrorMessage)("token is undefined unauthorized"));
        const tokenOrError = authService.refreshToken(token);
        if (tokenOrError.type == "error")
            return res.status(400).json(tokenOrError);
        return res.status(200).json({ accessToken: tokenOrError });
    }
    catch (error) {
        return res.status(500).json((0, services_1.createCatchErrorMessage)(error));
    }
};
const validateToken = (req, res) => {
    return res.status(200).json({
        message: "Token(s) validated",
    });
};
const register = (authService) => async (req, res) => {
    try {
        const { username, password } = req.body;
        const message = await authService.register(username, password);
        if (message.type == "success")
            return res.status(200).json(message);
        return res.status(500).json(message);
    }
    catch (error) {
        return res.status(400).json((0, services_1.createCatchErrorMessage)(error));
    }
};
