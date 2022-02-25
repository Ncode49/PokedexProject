import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER_ACCESS_TOKEN_SECRET =
  process.env.SERVER_ACCESS_TOKEN_SECRET ||
  "355B1BBFC96725CDCE8F4A2708FDA310A80E6D13315AEC4E5EED2A75FE8032CE";
const SERVER_REFRESH_TOKEN_SECRET =
  process.env.SERVER_REFRESH_TOKEN_SECRET || "refreshToken";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    accessTokenSecret: SERVER_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: SERVER_REFRESH_TOKEN_SECRET,
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
