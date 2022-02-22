"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Authentificate User
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
dotenv_1.default.config();
const app = (0, express_1.default)();
// parse the data from input PUT or POST
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const posts = [
    {
        username: "Kyle",
        title: "Post1",
    },
    {
        username: "Kyle2",
        title: "Post2",
    },
];
// refresh token (normally in data base)
const refreshTokens = [];
// can use through multiple server
app.get("/posts", authenticateToken, (req, res) => {
    // take only the good user
    res.json(posts.filter((post) => post.username === req.user.name));
});
// middleware
function authenticateToken(req, res, next) {
    // get the token verify the user and give to post
    // token get from the header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // Bearer TOKEN (get the second element)
    // 401 is authentificaiton issue
    if (token == null)
        return res.sendStatus(401);
    if (process_1.env.ACCESS_TOKEN_SECRET) {
        jsonwebtoken_1.default.verify(token, process_1.env.ACCESS_TOKEN_SECRET, (err, user) => {
            // 403 = permission error
            if (err)
                return res.sendStatus(403);
            // bon use
            req.user = user;
            next();
        });
    }
}
app.listen(3000);
console.log("listen to port 3000");
// refresh token one server creation deletion and have an expiration
// one server for authorization other for ,
// usecase api getting a task
// Authentification
app.post("/login", (req, res) => {
    // autneticate user
    const username = req.body.username;
    // create a user to serialize to create the token
    const user = { name: username };
    const accessToken = generateAcessToken(user);
    if (process_1.env.REFRESH_TOKEN_SECRET !== undefined) {
        // handle refresh token
        const refreshToken = jsonwebtoken_1.default.sign(user, process_1.env.REFRESH_TOKEN_SECRET);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    // return the token
});
app.post("/token", (req, res) => {
    // make refresh token as a string to correct type
    const refreshToken = req.body.token;
    if (refreshToken == null)
        return res.status(401);
    // test if refreshToken is valide (valid, remove)
    if (!refreshTokens.includes(refreshToken))
        return res.status(403);
    if (process_1.env.REFRESH_TOKEN_SECRET) {
        jsonwebtoken_1.default.verify(refreshToken, process_1.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403);
            if (user !== undefined) {
                const accessToken = generateAcessToken({ name: user.name });
                res.json({ accessToken: accessToken });
            }
        });
    }
});
function generateAcessToken(user) {
    if (process_1.env.ACCESS_TOKEN_SECRET !== undefined)
        return jsonwebtoken_1.default.sign(user, process_1.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s",
        });
}
