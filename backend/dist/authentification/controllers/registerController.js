"use strict";
// prend en paramaetre les méthode qui renvoit un service
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
const register = (client) => (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        cc: "cc",
    });
};
exports.register = register;
