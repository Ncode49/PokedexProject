// Authentificate User
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";
import { env } from "process";
import { Request, Response } from "express";
dotenv.config();
const app = express();
// parse the data from input PUT or POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// jwt que pour la connexion

type Next = () => void | Promise<void>;
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
// can use through multiple server
app.get("/posts", authenticateToken, (req, res) => {
  // take only the good user
  res.json(posts.filter((post) => post.username === req.user.name));
});

// middleware
function authenticateToken(req: Request, res: Response, next: Next) {
  // get the token verify the user and give to post
  // token get from the header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // Bearer TOKEN (get the second element)
  // 401 is authentificaiton issue
  if (token == null) return res.sendStatus(401);
  if (env.ACCESS_TOKEN_SECRET) {
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
      // 403 = permission error
      if (err) return res.sendStatus(403);
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
app.post("/login", (req: Request, res: Response) => {
  // autneticate user
  const username = req.body.username;
  // create a user to serialize to create the token
  const user = { name: username };
  const accessToken = generateAcessToken(user);
  if (env.REFRESH_TOKEN_SECRET !== undefined) {
    const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  // return the token
});

app.post("/token", (req, res) => {});

function generateAcessToken(user: { name: string }) {
  console.log("cc");
  if (env.ACCESS_TOKEN_SECRET !== undefined)
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
}
