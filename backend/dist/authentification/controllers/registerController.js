"use strict";
// prend en paramaetre les méthode qui renvoit un service
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
const register = (client, registerService) => async (req, res) => {
    const { username, password } = req.body;
    try {
        const { message } = await registerService.registerUser(client, username, password);
        return res.status(400).json({
            message: message,
        });
    }
    catch (error) {
        const err = error;
        return res.status(400).json({
            error: err,
            message: err.message,
        });
    }
};
exports.register = register;
