import { APIError, createCatchErrorMessage, MessageS } from '../services'
import {
  GetPokemonLikesResultType,
  Likes,
  LikeRepositoryType,
} from '../services/Repository/LikeRepository'

export type GetLikeServiceType = Promise<APIError | Likes>
export type AddLikeServiceType = Promise<APIError | MessageS>
export type ActionType = 'like' | 'unlike'
export type LikeServiceType = {
  getLike: (id: number) => GetLikeServiceType
  addLike: (
    action: string,
    pokemonId: number,
    username: string
  ) => AddLikeServiceType
}
export const LikeService = (pokemonRepository: LikeRepositoryType) => {
  return {
    getLike: getLike(pokemonRepository),
    addLike: addLike(pokemonRepository),
  }
}

// pokemon: string, like: number
const addLike =
  (pokemonRepository: LikeRepositoryType) =>
  async (
    action: string,
    pokemonId: number,
    username: string
  ): AddLikeServiceType => {
    try {
      const likeNumber = action == 'like' ? 1 : -1
      const pokemonResult = await pokemonRepository.addPokemonLike(
        pokemonId,
        likeNumber,
        username
      )
      return pokemonResult
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const getLike =
  (pokemonRepository: LikeRepositoryType) =>
  async (pokemonId: number): GetLikeServiceType => {
    try {
      const res = await pokemonRepository.getPokemonLikes(pokemonId)
      return res
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
