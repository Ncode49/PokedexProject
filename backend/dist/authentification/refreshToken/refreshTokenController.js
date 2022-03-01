"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const Error_1 = require("../../services/ServiceType/Error");
const refreshTokenController = (refreshTokenService) => async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined)
            return res
                .status(400)
                .json((0, Error_1.createErrorMessage)("token is undefined unauthorized"));
        const tokenOrError = refreshTokenService.refreshToken(token);
        if (typeof tokenOrError === "string")
            return res.status(200).json({ accessToken: tokenOrError });
        return res.status(400).json(tokenOrError);
    }
    catch (error) {
        return res.status(500).json((0, Error_1.createCatchErrorMessage)(error));
    }
};
exports.refreshTokenController = refreshTokenController;
