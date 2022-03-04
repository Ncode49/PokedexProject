import { Request, Response } from "express";
import { LikeServiceType } from ".";
import { createCatchErrorMessage } from "../services";

export type LikeControllerType = {
  addLike: any;
};

export const LikeController = (likeService: LikeServiceType) => {
  return {
    addLike: addLike(likeService),
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
