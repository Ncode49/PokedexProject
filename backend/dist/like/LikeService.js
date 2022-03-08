"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const services_1 = require("../services");
const LikeService = (likeRepository) => {
    return {
        getLike: getLike(likeRepository),
        addLike: addLike(likeRepository),
        getUserLikedPokemons: getUserLikedPokemons(likeRepository),
    };
};
exports.LikeService = LikeService;
const getUserLikedPokemons = (likeRepository) => async (username) => {
    try {
        return await likeRepository.getUserLikedPokemons(username);
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
// pokemon: string, like: number
const addLike = (likeRepository) => async (action, pokemonId, username) => {
    try {
        const likeNumber = action == 'like' ? 1 : -1;
        // cree userSErvice pour récupérer user extrait id
        return await likeRepository.addPokemonLike(pokemonId, likeNumber, username);
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
const getLike = (likeRepository) => async (pokemonId) => {
    try {
        return await likeRepository.getPokemonLikes(pokemonId);
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
