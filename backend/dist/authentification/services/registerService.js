"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerService = async (client, username, password) => {
    try {
        bcryptjs_1.default.hash(password, 10, async (err, hash) => {
            if (err)
                return err.message;
            const query = {
                text: "password" /*addUserPasswordQuery*/,
                values: [username, hash],
            };
            await client.connect();
            const res = await client.query(query);
            await client.end();
        });
    }
    catch (error) {
        const err = error;
        return err.message;
    }
    return "client bien enregisrée";
};
exports.registerService = registerService;
