"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const Error_1 = require("../../services/Error");
const LoginController = (loginService) => async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await loginService.login(username, password);
        if (data.type == "error")
            return res.status(400).json(data);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json((0, Error_1.createCatchErrorMessage)(error));
    }
};
exports.LoginController = LoginController;
