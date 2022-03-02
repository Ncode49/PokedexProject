"use strict";
// prend en paramaetre les méthode qui renvoit un service
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const Error_1 = require("../../services/Error");
const RegisterController = (registerService) => async (req, res) => {
    try {
        const { username, password } = req.body;
        const message = await registerService.register(username, password);
        if (message.type == "success")
            return res.status(200).json(message);
        return res.status(500).json(message);
    }
    catch (error) {
        return res.status(400).json((0, Error_1.createCatchErrorMessage)(error));
    }
};
exports.RegisterController = RegisterController;
