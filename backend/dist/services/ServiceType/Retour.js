"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccess = void 0;
// cas les deux undefined
// cas erreur
const isSuccess = (retour) => {
    if (retour.Success !== undefined && retour.Error === undefined)
        return true;
    return false;
};
exports.isSuccess = isSuccess;
