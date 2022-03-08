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
  getUserLikedPokemons: (username: string) => any
}
export const LikeService = (likeRepository: LikeRepositoryType) => {
  return {
    getLike: getLike(likeRepository),
    addLike: addLike(likeRepository),
    getUserLikedPokemons: getUserLikedPokemons(likeRepository),
  }
}
const getUserLikedPokemons =
  (likeRepository: LikeRepositoryType) => async (username: string) => {
    try {
      return await likeRepository.getUserLikedPokemons(username)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }

// pokemon: string, like: number
const addLike =
  (likeRepository: LikeRepositoryType) =>
  async (
    action: string,
    pokemonId: number,
    username: string
  ): AddLikeServiceType => {
    try {
      const likeNumber = action == 'like' ? 1 : -1
      return await likeRepository.addPokemonLike(
        pokemonId,
        likeNumber,
        username
      )
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const getLike =
  (likeRepository: LikeRepositoryType) =>
  async (pokemonId: number): GetLikeServiceType => {
    try {
      return await likeRepository.getPokemonLikes(pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
