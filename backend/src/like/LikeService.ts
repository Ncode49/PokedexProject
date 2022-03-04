import { createCatchErrorMessage } from "../services";
import { PokemonRepositoryType } from "../services/Repository/PokemonRepository";

//
export type ActionType = "like" | "unlike";
export type LikeServiceType = {
  addLike: (pokemonName: string, action: string) => any;
  getLike: (pokemonName: string) => any;
};
export const LikeService = (pokemonRepository: PokemonRepositoryType) => {
  return {
    getLike: getLike(pokemonRepository),
    addLike: addLike(pokemonRepository),
  };
};

// pokemon: string, like: number
const addLike =
  (pokemonRepository: PokemonRepositoryType) =>
  async (pokemonName: string, action: string) => {
    try {
      const likeNumber = action == "like" ? 1 : 0;
      await pokemonRepository.addPokemonLike(pokemonName, likeNumber);
    } catch (error) {
      createCatchErrorMessage(error);
    }
  };
const getLike =
  (pokemonRepository: PokemonRepositoryType) => async (pokemonName: string) => {
    try {
      return await pokemonRepository.getPokemonLikes(pokemonName);
    } catch (error) {
      createCatchErrorMessage(error);
    }
  };
