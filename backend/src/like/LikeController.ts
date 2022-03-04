import { Request, Response } from "express";
import { LikeServiceType } from ".";
import { createCatchErrorMessage } from "../services";
export type LikeAddLikeType = Promise<Response<any, Record<any, string>>>;
export type LikeGetLikeType = Promise<Response<any, Record<any, string>>>;
export type LikeControllerType = {
  addLike: (req: Request, res: Response) => LikeAddLikeType;
  getPokemonlike: (req: Request, res: Response) => LikeGetLikeType;
};

export const LikeController = (likeService: LikeServiceType) => {
  return {
    addLike: addLike(likeService),
    getPokemonlike: getPokemonlike(likeService),
  };
};

const addLike =
  (likeService: LikeServiceType) => async (req: Request, res: Response) => {
    try {
      const { action, pokemonName } = req.body;
      console.log("controlleur");
      const message = await likeService.addLike(pokemonName, action);
      console.log("controller result:" + message);
      if (message.type == "success") return res.status(200).json(message);
      return res.status(500).json(message);
    } catch (error) {
      console.log(error);
      return res.status(400).json(createCatchErrorMessage(error));
    }
  };

const getPokemonlike =
  (likeService: LikeServiceType) => async (req: Request, res: Response) => {
    try {
      const { pokemonName } = req.body;
      const message = await likeService.getLike(pokemonName);
      if (message.type == "success") return res.status(200).json(message);
      return res.status(500).json(message);
    } catch (error) {
      return res.status(400).json(createCatchErrorMessage(error));
    }
  };
