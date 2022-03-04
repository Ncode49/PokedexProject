"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const services_1 = require("../services");
const LikeController = (likeService) => {
    return {
        addLike: addLike(likeService),
        getLike: getLike(likeService),
    };
};
exports.LikeController = LikeController;
const addLike = (likeService) => async (req, res) => {
    try {
        const { action, pokemonName } = req.body;
        const message = await likeService.addLike(action, pokemonName);
        if (message.type == "success")
            return res.status(200).json(message);
        return res.status(500).json(message);
    }
    catch (error) {
        return res.status(400).json((0, services_1.createCatchErrorMessage)(error));
    }
};
const getLike = (likeService) => async (req, res) => {
    try {
        const { pokemonName } = req.body;
        const message = await likeService.getLike(pokemonName);
        if (message.type == "success")
            return res.status(200).json(message);
        return res.status(500).json(message);
    }
    catch (error) {
        return res.status(400).json((0, services_1.createCatchErrorMessage)(error));
    }
};
