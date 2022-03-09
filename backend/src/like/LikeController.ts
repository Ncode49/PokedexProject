import { Request, Response } from 'express'
import { LikeServiceType } from '.'
import { createCatchErrorMessage } from '../services'
export type LikeAddLikeControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type LikeGetLikeControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type GetPokemonsUserControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type RemoveLikeControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type LikeControllerType = {
  addLike: LikeAddLikeControllerType
  getPokemonlike: LikeGetLikeControllerType
  getPokemonsUser: GetPokemonsUserControllerType
}

export const LikeController = (
  likeService: LikeServiceType
): LikeControllerType => {
  return {
    addLike: addLike(likeService),
    getPokemonlike: getPokemonlike(likeService),
    getPokemonsUser: getPokemonsUser(likeService),
  }
}

const addLike =
  (likeService: LikeServiceType): LikeAddLikeControllerType =>
  async (req: Request, res: Response) => {
    try {
      const { action, pokemonId, username } = req.body
      const message = await likeService.addLike(action, pokemonId, username)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const getPokemonlike =
  (likeService: LikeServiceType): LikeGetLikeControllerType =>
  async (req: Request, res: Response) => {
    try {
      const { pokemonId } = req.body
      const message = await likeService.getLike(pokemonId)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const getPokemonsUser =
  (likeService: LikeServiceType): GetPokemonsUserControllerType =>
  async (req: Request, res: Response) => {
    try {
      const { username } = req.body
      const message = await likeService.getUserLikedPokemons(username)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }
