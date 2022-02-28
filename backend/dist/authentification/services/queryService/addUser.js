"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const addUser = (client) => async (query) => {
    try {
        await client.connect();
        const res = await client.query(query);
        await client.end();
        return { message: "l'utilisateur a ete enregistré" };
    }
    catch (error) {
        const err = error;
        return { message: err.message };
    }
};
exports.addUser = addUser;
