"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
console.log('hello');
const server = new server_1.Server(4000);
server.start();
