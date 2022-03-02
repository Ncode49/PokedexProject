"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const Error_1 = require("../../services/Error");
const RefreshTokenController = (refreshTokenService) => async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined)
            return res
                .status(400)
                .json((0, Error_1.createErrorMessage)("token is undefined unauthorized"));
        const tokenOrError = refreshTokenService.refreshToken(token);
        if (tokenOrError.type == "error")
            return res.status(400).json(tokenOrError);
        return res.status(200).json({ accessToken: tokenOrError });
    }
    catch (error) {
        return res.status(500).json((0, Error_1.createCatchErrorMessage)(error));
    }
};
exports.RefreshTokenController = RefreshTokenController;
