"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const services_1 = require("../services");
const LikeService = (pokemonRepository) => {
    return {
        getLike: getLike(pokemonRepository),
        addLike: addLike(pokemonRepository),
    };
};
exports.LikeService = LikeService;
// pokemon: string, like: number
const addLike = (pokemonRepository) => async (action, pokemonId, username) => {
    try {
        const likeNumber = action == 'like' ? 1 : -1;
        const pokemonResult = await pokemonRepository.addPokemonLike(pokemonId, likeNumber, username);
        return pokemonResult;
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
const getLike = (pokemonRepository) => async (pokemonId) => {
    try {
        const res = await pokemonRepository.getPokemonLikes(pokemonId);
        return res;
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
