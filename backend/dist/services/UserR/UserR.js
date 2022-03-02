"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserR = void 0;
const Error_1 = require("../Error");
const UserQuery_1 = require("./UserQuery");
const UserR = (client) => {
    return {
        addUser: addUser(client),
        findUser: findUser(client),
    };
};
exports.UserR = UserR;
const addUser = (client) => async (username, hash) => {
    try {
        await client.connect();
        const query = {
            text: UserQuery_1.addUserPasswordQuery,
            values: [username, hash],
        };
        await client.query(query);
        return {
            type: "success",
            message: "l'utilisateur a été enregistré en bdd",
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
    finally {
        client.end();
        console.log("client déconnecté");
    }
};
const findUser = (client) => async (username, password) => {
    try {
        client.connect();
        const query = {
            text: UserQuery_1.findUserByUsername,
            values: [username],
        };
        const data = await client.query(query);
        const users = data.rows;
        if (users.length == 0)
            return {
                type: "error",
                message: "l'utilisateur n'existe pas en base de données",
            };
        return { type: "success", password: users[0].password };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
    finally {
        client.end();
    }
};
