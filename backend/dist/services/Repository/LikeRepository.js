"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRepository = void 0;
const __1 = require("..");
const Error_1 = require("../Error");
const LikeRepository = (baseRepository) => {
    return {
        getPokemonLikes: getPokemonLikes(baseRepository),
        addPokemonLike: addPokemonLike(baseRepository),
        getUserLikedPokemons: getUserLikedPokemons(baseRepository),
    };
};
exports.LikeRepository = LikeRepository;
const getUserLikedPokemons = (baseRepository) => async (username) => {
    const transactionresult = await baseRepository.transaction(async (client) => {
        const user_uuid = await getUserUuid(client, username);
        const res = await client.query({
            text: 'SELECT pokemon_id FROM "like" WHERE user_uuid = $1',
            values: [user_uuid],
        });
        return {
            type: 'successPayload',
            result: res,
        };
    });
    if (transactionresult.type == 'successPayload') {
        const { rows } = transactionresult.result;
        const ret = { type: 'success', pokemons: rows };
        return ret;
    }
    if (transactionresult.type == 'success')
        return (0, __1.createCatchErrorMessage)('success sans payload impossible');
    return transactionresult;
};
const getPokemonLikes = (baseRepository) => async (pokemonId) => {
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
const addPokemonLike = (baseRepository) => async (pokemonId, likeNumber, username) => {
    const res = await baseRepository.transaction(async (client) => {
        const user_uuid = await getUserUuid(client, username);
        const pokemonLikes = await getPokemonLike(client, pokemonId);
        if (pokemonLikes == 0 && likeNumber == -1) {
            return (0, __1.createErrorMessage)('nombre de like finaux negatifs');
        }
        if (likeNumber == 1)
            return await addLikeEntry(client, pokemonId, user_uuid);
        return await deleteLikeEntry(client, pokemonId, user_uuid);
    });
    if (res.type == 'successPayload')
        return (0, __1.createErrorMessage)("success sans payload n'existe pas");
    return res;
};
const getUserUuid = async (client, username) => {
    const { rows } = await client.query({
        text: 'SELECT "user_uuid" FROM "user" WHERE "username" = $1',
        values: [username],
    });
    return rows[0].user_uuid;
};
const addLikeEntry = async (client, pokemonId, user_uuid) => {
    await client.query({
        text: 'INSERT INTO "like"("user_uuid","pokemon_id") VALUES($1,$2)',
        values: [user_uuid, pokemonId],
    });
    return (0, Error_1.createSuccessMessage)(`le like a été ajouté du pokemon ${pokemonId}`);
};
const deleteLikeEntry = async (client, pokemonId, user_uuid) => {
    const { rows } = await client.query({
        text: 'DELETE FROM "like" WHERE user_uuid = $1 AND pokemon_id = $2',
        values: [user_uuid, pokemonId],
    });
    return (0, Error_1.createSuccessMessage)(`le like a été enlevé du pokemon ${pokemonId}`);
};
const getPokemonLike = async (client, pokemonId) => {
    const { rows } = await client.query({
        text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
        values: [pokemonId],
    });
    return rows[0].count;
};
