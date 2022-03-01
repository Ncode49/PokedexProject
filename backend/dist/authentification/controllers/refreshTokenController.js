"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const refreshToken = (tokenService) => async (req, res) => {
    // get the token
    const token = req.headers.authorization?.split(" ")[1];
    if (token === undefined) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    // TODO Verifier que la personne a toujours les droits
    const payload = tokenService.verifyRefreshToken(token);
    const accessToken = tokenService.generateAccessToken(payload.username);
    res.status(200).json({
        accessToken: accessToken,
    });
};
exports.refreshToken = refreshToken;
