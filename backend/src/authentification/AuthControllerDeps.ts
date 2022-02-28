import { QueryServiceType } from "./services/queryService/QueryServiceType";
import { RegisterServiceType } from "./services/registerService/RegisterServiceType";

// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  queryService: QueryServiceType;
  registerService: RegisterServiceType;
}
