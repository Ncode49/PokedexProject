import { Client } from "pg";
import { Message } from "./services/registerService/registerService";
import { RegisterServiceType } from "./services/registerService/RegisterServiceType";

// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  client: Client;
  registerService: RegisterServiceType;
}
