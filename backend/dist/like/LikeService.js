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
const addLike = (pokemonRepository) => async (pokemonName, action) => {
    try {
        const likeNumber = action == "like" ? 1 : 0;
        await pokemonRepository.addPokemonLike(pokemonName, likeNumber);
    }
    catch (error) {
        (0, services_1.createCatchErrorMessage)(error);
    }
};
const getLike = (pokemonRepository) => async (pokemonName) => {
    try {
        return await pokemonRepository.getPokemonLikes(pokemonName);
    }
    catch (error) {
        (0, services_1.createCatchErrorMessage)(error);
    }
};
