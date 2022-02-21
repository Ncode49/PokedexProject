"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    port;
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = (0, express_1.default)();
        app.get('/', function (req, res) {
            res.send('salut les gens');
        });
        app.listen(this.port, function () {
            console.log('serveur a démarré');
        });
    }
}
exports.Server = Server;
