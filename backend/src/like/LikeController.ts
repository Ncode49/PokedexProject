import { Request, Response } from "express";
import { LikeServiceType } from ".";
import { createCatchErrorMessage } from "../services";
export type LikeAddLikeType = Promise<Response<any, Record<any, string>>>;
export type LikeGetLikeType = Promise<Response<any, Record<any, string>>>;
export type LikeControllerType = {
  addLike: (req: Request, res: Response) => LikeAddLikeType;
  getLike: (req: Request, res: Response) => LikeGetLikeType;
};

export const LikeController = (likeService: LikeServiceType) => {
  return {
    addLike: addLike(likeService),
    getLike: getLike(likeService),
  };
};

const addLike =
  (likeService: LikeServiceType) => async (req: Request, res: Response) => {
    try {
      const { action, pokemonName } = req.body;
      const message = await likeService.addLike(action, pokemonName);
      if (message.type == "success") return res.status(200).json(message);
      return res.status(500).json(message);
    } catch (error) {
      return res.status(400).json(createCatchErrorMessage(error));
    }
  };

const getLike =
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
