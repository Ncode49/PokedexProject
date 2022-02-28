import { Client } from "pg";
import config from "../../config/config";

// list of different dépendences
export const client = new Client(config.postgres);
