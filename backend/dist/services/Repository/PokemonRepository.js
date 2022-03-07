"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRepository = void 0;
const __1 = require("..");
const Error_1 = require("../Error");
const PokemonRepository = (baseRepository) => {
    return {
        getPokemonLikes: getPokemonLikes(baseRepository),
        addPokemonLike: addPokemonLike(baseRepository),
    };
};
exports.PokemonRepository = PokemonRepository;
const getPokemonLikes = (baseRepository) => async (pokemonName) => {
    const transactionResult = await baseRepository.transaction(async (client) => {
        const res = await client.query({
            text: 'SELECT *  FROM pokemon WHERE name = $1',
            values: [pokemonName],
        });
        const { rows } = res;
        if (rows.length == 0)
            return (0, __1.createErrorMessage)("le pokemon n'existe pas en base de données");
        return {
            type: 'successPayload',
            result: res,
        };
    });
    if (transactionResult.type == 'successPayload') {
        const { rows } = transactionResult.result;
        return { type: 'success', like: rows[0].like };
    }
    if (transactionResult.type == 'error')
        return transactionResult;
    return (0, __1.createErrorMessage)("success sans payload n'existe pas");
};
const addPokemonLike = (baseRepository) => async (pokemonName, likeNumber) => {
    const res = await baseRepository.transaction(async (client) => {
        const { rows } = await client.query({
            text: 'SELECT * FROM pokemon WHERE name = $1',
            values: [pokemonName],
        });
        if (rows.length == 0) {
            if (likeNumber == -1)
                return (0, __1.createErrorMessage)('nombre de like negatifs');
            await client.query({
                text: 'INSERT INTO pokemon("name", "like") VALUES($1, $2) RETURNING *',
                values: [pokemonName, 1],
            });
            return (0, Error_1.createSuccessMessage)("l'utilisateur a été crée");
        }
        const newNumberLike = rows[0].like + likeNumber;
        if (newNumberLike == 0) {
            await client.query({
                text: 'DELETE FROM pokemon WHERE name = $1',
                values: [pokemonName],
            });
            return (0, Error_1.createSuccessMessage)('l utilisateur a ete supprime');
        }
        else {
            await client.query({
                text: 'UPDATE pokemon SET "like" = $1 WHERE "name" = $2 RETURNING *',
                values: [newNumberLike, pokemonName],
            });
            return (0, Error_1.createSuccessMessage)('le like a été correctement ajouté/supprime en base de données');
        }
    });
    if (res.type == 'successPayload')
        return (0, __1.createErrorMessage)("success sans payload n'existe pas");
    return res;
};
