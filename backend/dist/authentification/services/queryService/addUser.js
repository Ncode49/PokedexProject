"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const addUser = (client) => async (query) => {
    try {
        await client.connect();
        const res = await client.query(query);
        return { message: "l'utilisateur a été enregistré" };
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        return { message: err.message };
    }
    finally {
        client.end();
        console.log("client déconnecté");
    }
};
exports.addUser = addUser;
