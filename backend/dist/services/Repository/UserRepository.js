"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const __1 = require("..");
const UserRepository = (baseRepository) => {
    return {
        addUser: addUser(baseRepository),
        getPasswordByUsername: getPasswordByUsername(baseRepository),
    };
};
exports.UserRepository = UserRepository;
const addUser = (baseRepository) => async (username, hash) => {
    const transactionResult = await baseRepository.transaction(async (client) => {
        const res = await client.query({
            text: 'INSERT INTO "user"("user_uuid","username","password") VALUES(uuid_generate_v4(),$1, $2) RETURNING *',
            values: [username, hash],
        });
        const success = {
            type: 'success',
            message: "l'utilisateur a été ajouté en base de donnée",
        };
        return success;
    });
    if (transactionResult.type == 'error' ||
        transactionResult.type == 'success')
        return transactionResult;
    return (0, __1.createErrorMessage)("success avec payload n'existe pas");
};
const getPasswordByUsername = (baseRepository) => async (username) => {
    const transactionResult = await baseRepository.transaction(async (client) => {
        const result = await client.query({
            text: 'SELECT * FROM "user" WHERE username = $1',
            values: [username],
        });
        const successPayload = {
            type: 'successPayload',
            result: result,
        };
        return successPayload;
    });
    if (transactionResult.type == 'error')
        return transactionResult;
    if (transactionResult.type == 'successPayload') {
        const { rows } = transactionResult.result;
        if (rows.length == 0)
            return (0, __1.createErrorMessage)("l'utilisateur n'existe pas en base de données");
        return {
            type: 'success',
            password: rows[0].password,
        };
    }
    return (0, __1.createErrorMessage)("success sans payload n'existe pas");
};
// abstraction des transactions
// cree une fonction qui fait le traitement
// function(c client => client.query)
