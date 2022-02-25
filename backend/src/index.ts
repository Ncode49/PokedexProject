import express from "express";
import config from "./config/config";
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
// define controller les methodes utilisé
const AuthController = () => {
  return () => {};
};
// add routes for auth
app.use("/auth", AuthController());
// AuthSErvice contient repository ou autre service
// const authService = AuthService(...)
// définit toutes les routes
// const authController = AuthController(authService)
// app.use("/auth", authRouter(authController));
// listen
app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`);
});
