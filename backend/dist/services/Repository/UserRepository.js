"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Error_1 = require("../Error");
const UserRepository = (pool) => {
    return {
        addUser: addUser(pool),
        getPasswordByUsername: getPasswordByUsername(pool),
    };
};
exports.UserRepository = UserRepository;
// transaction((client) => client.query({text: ...., values: [...]}))
const oneTransaction = async (pool, query) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const queryReturn = await client.query(query);
        await client.query("COMMIT");
        return {
            type: "success",
            queryReturn: queryReturn,
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
const addUser = (pool) => async (username, hash) => {
    const transactionResult = await oneTransaction(pool, {
        text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
        values: [username, hash],
    });
    if (transactionResult.type == "error")
        return transactionResult;
    return {
        type: "success",
        message: "l'utilisateur a été enregistré en bdd",
    };
};
const getPasswordByUsername = (pool) => async (username) => {
    const transactionResult = await oneTransaction(pool, {
        text: "SELECT *  FROM users WHERE username = $1",
        values: [username],
    });
    if (transactionResult.type == "error")
        return transactionResult;
    const { rows } = transactionResult.queryReturn;
    if (rows.length == 0)
        return {
            type: "error",
            message: "l'utilisateur n'existe pas en base de données",
        };
    return { type: "success", password: rows[0].password };
};
// abstraction des transactions
// cree une fonction qui fait le traitement
// function( client => client.query)
