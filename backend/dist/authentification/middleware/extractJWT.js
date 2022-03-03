"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractJWT = void 0;
// 401 unauthorized
// How to eliminate the any ???
const ExtractJWT = (jwtService) => (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null)
            return res
                .status(401)
                .json({ type: "middleware error", message: "token in empty" });
        const jwtResult = jwtService.verifyAccessToken(token);
        if (jwtResult.type == "error")
            return res.status(401).json({ jwtResult });
    }
    catch (error) {
        console.log("throw an error");
        const err = error;
        return res.status(403).json(err.message);
    }
    next();
    console.log("finit");
    return;
};
exports.ExtractJWT = ExtractJWT;
