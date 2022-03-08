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
const getPokemonLikes = (baseRepository) => async (pokemonId) => {
    console.log('here');
    const transactionResult = await baseRepository.transaction(async (client) => {
        const res = await client.query({
            text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
            values: [pokemonId],
        });
        return {
            type: 'successPayload',
            result: res,
        };
    });
    if (transactionResult.type == 'successPayload') {
        const { rows } = transactionResult.result;
        return { type: 'success', like: rows[0].count };
    }
    if (transactionResult.type == 'error')
        return transactionResult;
    return (0, __1.createErrorMessage)("success sans payload n'existe pas");
};
// we need the username
const addPokemonLike = (baseRepository) => async (pokemonId, pokemonName, likeNumber, username) => {
    const res = await baseRepository.transaction(async (client) => {
        const { rows } = await client.query({
            text: 'SELECT * FROM "like" WHERE pokemon_id = $1',
            values: [pokemonId],
        });
        if (rows.length == 0) {
            if (likeNumber == -1)
                return (0, __1.createErrorMessage)('nombre de like negatifs');
            // on cree le pokemon dans la table pokemon
            await client.query({
                text: 'INSERT INTO "pokemon"("id", "name") VALUES($1, $2) RETURNING *',
                values: [pokemonId, pokemonName],
            });
            // on cree le lien dans la table like
            // d'abord, on recupere l'uuid dans la premiere table
            const { rows } = await client.query({
                text: 'SELECT "user_uuid" FROM "user" WHERE "username" = $1',
                values: [username],
            });
            const user_uuid = rows[0].user_uuid;
            await client.query({
                text: 'INSERT INTO "like"("user_uuid","pokemon_id") VALUES($1,$2)',
                values: [user_uuid, pokemonId],
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
