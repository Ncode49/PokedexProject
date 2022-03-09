import { APIError, createCatchErrorMessage, MessageS } from '../services'
import {
  Likes,
  LikeRepositoryType,
  PokemonIdListResultSuccess,
} from '../services/Repository/LikeRepository'
export type ActionType = 'like' | 'unlike'

export type GetLikeLikeServiceType = (id: number) => Promise<APIError | Likes>
export type AddLikeLikeServiceType = (
  user_uuid: string,
  pokemonId: number
) => Promise<APIError | MessageS>
export type GetUserLikedPokemonsLikeServiceType = (
  username: string
) => Promise<APIError | PokemonIdListResultSuccess>
export type LikeServiceType = {
  getLike: GetLikeLikeServiceType
  addLike: AddLikeLikeServiceType
  removeLike: AddLikeLikeServiceType
  getUserLikedPokemons: GetUserLikedPokemonsLikeServiceType
}
export const LikeService = (likeRepository: LikeRepositoryType) => {
  return {
    getLike: getLike(likeRepository),
    addLike: addLike(likeRepository),
    removeLike: removeLike(likeRepository),
    getUserLikedPokemons: getUserLikedPokemons(likeRepository),
  }
}
const getUserLikedPokemons =
  (likeRepository: LikeRepositoryType): GetUserLikedPokemonsLikeServiceType =>
  async (username: string) => {
    try {
      return await likeRepository.getUserLikedPokemons(username)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }

// pokemon: string, like: number
const addLike =
  (likeRepository: LikeRepositoryType): AddLikeLikeServiceType =>
  async (user_uuid: string, pokemonId: number) => {
    try {
      return await likeRepository.addPokemonLike(user_uuid, pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }

const removeLike =
  (likeRepository: LikeRepositoryType): AddLikeLikeServiceType =>
  async (user_uuid: string, pokemonId: number) => {
    try {
      return await likeRepository.removePokemonLike(user_uuid, pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const getLike =
  (likeRepository: LikeRepositoryType): GetLikeLikeServiceType =>
  async (pokemonId: number) => {
    try {
      return await likeRepository.getPokemonLikes(pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
