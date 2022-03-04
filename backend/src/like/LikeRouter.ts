import express from "express";
import { LikeControllerType } from "./LikeController";

export const likeRouter = (
  likeController: LikeControllerType,
  extractJWT: any
) => {
  const likeRouter = express.Router();
  likeRouter.post("/addlike", extractJWT, likeController.addLike);
  return likeRouter;
};
