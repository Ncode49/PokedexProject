"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptService = void 0;
const cryptService = () => {
    return {
        hashPassword: hashPassword,
        compareHash: compareHash,
    };
};
exports.cryptService = cryptService;
const compareHash = async (password, hash) => {
    const valid = await bcryptjs.compare(password, hash);
    if (valid)
        return { message: "mot de passe correct" };
    return { message: "mot de passe incorrect" };
};
const hashPassword = async (password) => {
    try {
        const hash = await bcryptjs.hash(password, 10);
        return hash;
    }
    catch (error) {
        const err = error;
        return {
            message: err.message,
        };
    }
};
