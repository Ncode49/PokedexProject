"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const query_1 = require("./query");
const findUser = (client) => async (username, password) => {
    try {
        client.connect();
        const query = {
            text: query_1.findUserByUsername,
            values: [username],
        };
        const data = await client.query(query);
        const users = data.rows;
        if (users.length == 0)
            return { message: "l'utilisateur n'existe pas en base de données" };
        return { password: users[0].password };
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
