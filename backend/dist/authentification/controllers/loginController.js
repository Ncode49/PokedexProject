"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const isMessage = (data) => {
    return data.message !== undefined;
};
const isValid = (message) => {
    if (message.message === "mot de passe incorrect")
        return false;
    return true;
};
const login = (queryService, cryptoService, tokenService) => async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await queryService.findUser(username, password);
        if (isMessage(data)) {
            return res.status(400).json(data);
        }
        const hash = data.password;
        const message = await cryptoService.compareHash(password, hash);
        if (!isValid(message))
            return res.status(400).json(message);
        const accessToken = tokenService.generateAccessToken(username);
        const refreshToken = tokenService.generateRefreshToken(username);
        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch (error) {
        const err = error;
        return res.status(400).json({
            message: err.message,
        });
    }
};
exports.login = login;
