import { APIError, createCatchErrorMessage, MessageS } from '../services'
import {
  Likes,
  LikeRepositoryType,
} from '../services/Repository/LikeRepository'
export type ActionType = 'like' | 'unlike'

export type GetLikeLikeServiceType = (id: number) => Promise<APIError | Likes>
export type AddLikeLikeServiceType = (
  action: string,
  pokemonId: number,
  username: string
) => Promise<APIError | MessageS>
export type GetUserLikedPokemonsLikeServiceType = (username: string) => any
export type LikeServiceType = {
  getLike: GetLikeLikeServiceType
  addLike: AddLikeLikeServiceType
  getUserLikedPokemons: (username: string) => Promise<APIError>
}
export const LikeService = (likeRepository: LikeRepositoryType) => {
  return {
    getLike: getLike(likeRepository),
    addLike: addLike(likeRepository),
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
  async (action: string, pokemonId: number, username: string) => {
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
  (likeRepository: LikeRepositoryType): GetLikeLikeServiceType =>
  async (pokemonId: number) => {
    try {
      return await likeRepository.getPokemonLikes(pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
