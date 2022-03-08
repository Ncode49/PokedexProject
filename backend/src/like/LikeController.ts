import { Request, Response } from 'express'
import { LikeServiceType } from '.'
import { createCatchErrorMessage } from '../services'
export type LikeAddLikeControllerType = Promise<
  Response<any, Record<any, string>>
>
export type LikeGetLikeControllerType = Promise<
  Response<any, Record<any, string>>
>
export type LikeControllerType = {
  addLike: (req: Request, res: Response) => LikeAddLikeControllerType
  getPokemonlike: (req: Request, res: Response) => LikeGetLikeControllerType
}

export const LikeController = (likeService: LikeServiceType) => {
  return {
    addLike: addLike(likeService),
    getPokemonlike: getPokemonlike(likeService),
  }
}

const addLike =
  (likeService: LikeServiceType) =>
  async (req: Request, res: Response): LikeAddLikeControllerType => {
    try {
      const { action, pokemonId, username } = req.body
      const message = await likeService.addLike(action, pokemonId, username)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      console.log(error)
      return res.status(400).json(createCatchErrorMessage(error))
    }
  }

const getPokemonlike =
  (likeService: LikeServiceType) =>
  async (req: Request, res: Response): LikeGetLikeControllerType => {
    try {
      const { pokemonId } = req.body
      const message = await likeService.getLike(pokemonId)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(400).json(createCatchErrorMessage(error))
    }
  }
