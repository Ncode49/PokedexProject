"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = __importDefault(require("express"));
const likeRouter = (likeController, extractJWT) => {
    const likeRouter = express_1.default.Router();
    likeRouter.post("/addLike", extractJWT, likeController.addLike);
    likeRouter.post("/getLike", extractJWT, likeController.getLike);
    return likeRouter;
};
exports.likeRouter = likeRouter;
