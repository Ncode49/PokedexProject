import express from "express";
import { AuthControllerDI } from "./authentification/AutControllerDI";
import { client } from "./authentification/services/Client";
import { registerService } from "./authentification/services/registerService/registerService";
import config from "./config/config";
import { authRouter } from "./routes/authRouter";
const app = express();

// load middleware we need
// parse the data from input PUT or POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to connect localhost for http server
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// gérer le client ici
// define controller les methodes utilisé
/*
const foo = (param1: string) => {
  return (param2: string) => {
    return param1 + param2;
  };
};
// param1 controller
// fonctionnalité du controleur
// param2 req,res,next
*/
// instanciation du controller
const authController = AuthControllerDI({
  client: client,
  registerService: registerService(),
});
// add routes for auth
app.use("/auth", authRouter(authController));
// AuthService contient repository ou autre service
// const authService = AuthService(...)
// définit toutes les routes
// const authController = AuthController(authService)
// app.use("/auth", authRouter(authController));
// listen
app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`);
});
