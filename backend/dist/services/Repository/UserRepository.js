"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserRepository = (baseRepository) => {
    return {
        addUser: addUser(baseRepository),
        getPasswordByUsername: getPasswordByUsername(baseRepository),
    };
};
exports.UserRepository = UserRepository;
// transaction((client) => client.query({text: ...., values: [...]}))
const addUser = (baseRepository) => async (username, hash) => {
    const transactionResult = await baseRepository.transaction((client) => {
        return client.query({
            text: 'INSERT INTO users("username","password") VALUES($1, $2) RETURNING *',
            values: [username, hash],
        });
    });
    if (transactionResult.type == 'error')
        return transactionResult;
    return {
        type: 'success',
        message: "l'utilisateur a été ajoute en base de donnée",
    };
};
const getPasswordByUsername = (baseRepository) => async (username) => {
    const transactionResult = await baseRepository.transaction((client) => {
        return client.query({
            text: 'SELECT * FROM users WHERE username = $1',
            values: [username],
        });
    });
    if (transactionResult.type == 'error')
        return transactionResult;
    const { rows } = transactionResult.result;
    if (rows.length == 0)
        return {
            type: 'error',
            message: "l'utilisateur n'existe pas en base de données",
        };
    return { type: 'success', password: rows[0].password };
};
// abstraction des transactions
// cree une fonction qui fait le traitement
// function(c client => client.query)
