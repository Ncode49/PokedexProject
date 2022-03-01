import express from "express";
import { AuthControllerDI } from "./authentification/AutControllerDI";
import { client } from "./services/Client";
import { cryptService } from "./services/cryptoService/CryptoService";
import { queryService } from "./services/queryService/QueryService";
import { tokenService } from "./services/tokenService/tokenService";
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

const authController = AuthControllerDI({
  queryService: queryService({ client: client }),
  tokenService: tokenService(),
  cryptoService: cryptService(),
});
app.use("/auth", authRouter(authController));

app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`);
});
