"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const findUser = (client) => async (query) => {
    try {
        client.connect();
        const data = await client.query(query);
        const users = data.rows;
        if (users.length == 0)
            return { message: "l'utilisateur n'existe pas en base de données" };
        return { message: "l'utilisateur a été trouvé" };
    }
    catch (error) {
        const err = error;
        return { message: err.message };
    }
    finally {
        client.end();
    }
};
exports.findUser = findUser;
