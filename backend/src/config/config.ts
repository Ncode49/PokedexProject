import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "issuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "secret";
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};
const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "Tching@43@";
const POSTGRES_PORT = 5432;
const POSTGRES = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
};
const config = {
  server: SERVER,
  postgres: POSTGRES,
};

export default config;
