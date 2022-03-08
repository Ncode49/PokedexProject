import express from 'express'
import { LikeControllerType } from './LikeController'

export const likeRouter = (
  likeController: LikeControllerType,
  extractJWT: any
) => {
  const likeRouter = express.Router()
  likeRouter.post('/addLike', extractJWT, likeController.addLike)
  likeRouter.post('/getPokemonlike', extractJWT, likeController.getPokemonlike)
  return likeRouter
}
