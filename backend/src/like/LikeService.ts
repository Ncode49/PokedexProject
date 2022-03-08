import { APIError, createCatchErrorMessage, MessageS } from '../services'
import {
  GetPokemonLikesResultType,
  Likes,
  PokemonRepositoryType,
} from '../services/Repository/PokemonRepository'

export type GetLikeServiceType = Promise<APIError | Likes>
export type AddLikeServiceType = Promise<APIError | MessageS>
export type ActionType = 'like' | 'unlike'
export type LikeServiceType = {
  getLike: (id: number) => GetLikeServiceType
  addLike: (
    id: number,
    pokemonName: string,
    action: string,
    username: string
  ) => AddLikeServiceType
}
export const LikeService = (pokemonRepository: PokemonRepositoryType) => {
  return {
    getLike: getLike(pokemonRepository),
    addLike: addLike(pokemonRepository),
  }
}

// pokemon: string, like: number
const addLike =
  (pokemonRepository: PokemonRepositoryType) =>
  async (
    id: number,
    pokemonName: string,
    action: string,
    username: string
  ): AddLikeServiceType => {
    try {
      const likeNumber = action == 'like' ? 1 : -1
      const pokemonResult = await pokemonRepository.addPokemonLike(
        id,
        pokemonName,
        likeNumber,
        username
      )
      return pokemonResult
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const getLike =
  (pokemonRepository: PokemonRepositoryType) =>
  async (pokemonId: number): GetLikeServiceType => {
    try {
      const res = await pokemonRepository.getPokemonLikes(pokemonId)
      return res
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
