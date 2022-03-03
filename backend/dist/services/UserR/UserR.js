"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserR = void 0;
const Error_1 = require("../Error");
const UserQuery_1 = require("./UserQuery");
const UserR = (pool) => {
    return {
        addUser: addUser(pool),
        getPasswordByUsername: getPasswordByUsername(pool),
    };
};
exports.UserR = UserR;
const addUser = (pool) => async (username, hash) => {
    const client = await pool.connect();
    try {
        const query = {
            text: UserQuery_1.addUserPasswordQuery,
            values: [username, hash],
        };
        await client.query("BEGIN");
        await client.query(query);
        await client.query("COMMIT");
        return {
            type: "success",
            message: "l'utilisateur a été enregistré en bdd",
        };
    }
    catch (error) {
        await client.query("ROLLBACK");
        return (0, Error_1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
const getPasswordByUsername = (pool) => async (username) => {
    const client = await pool.connect();
    try {
        const query = {
            text: UserQuery_1.getUserByUsername,
            values: [username],
        };
        await client.query("BEGIN");
        const { rows } = await client.query(query);
        await client.query("COMMIT");
        const users = rows;
        if (users.length == 0)
            return {
                type: "error",
                message: "l'utilisateur n'existe pas en base de données",
            };
        return { type: "success", password: users[0].password };
    }
    catch (error) {
        await client.query("ROLLBACK");
        return (0, Error_1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
