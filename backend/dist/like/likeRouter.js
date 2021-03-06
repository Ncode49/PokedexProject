"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = __importDefault(require("express"));
const likeRouter = (likeController, extractJWT) => {
    const likeRouter = express_1.default.Router();
    likeRouter.post('/addLike', extractJWT, likeController.addLike);
    likeRouter.post('/getPokemonlike', extractJWT, likeController.getPokemonlike);
    likeRouter.post('/getUserPokemon', extractJWT, likeController.getPokemonsUser);
    return likeRouter;
};
exports.likeRouter = likeRouter;
// deux route diff pour like add delete, get a la place de post
// 403 forbiddon pour error
