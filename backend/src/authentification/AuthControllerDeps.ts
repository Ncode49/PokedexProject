import { cryptoServiceType } from "./services/cryptoService/CryptoServiceType";
import { QueryServiceType } from "./services/queryService/QueryServiceType";
import { RegisterServiceType } from "./services/registerService/RegisterServiceType";
import { TokenServiceType } from "./services/tokenService/TokenServiceType";

// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  queryService: QueryServiceType;
  registerService: RegisterServiceType;
  tokenService: TokenServiceType;
  cryptoService: cryptoServiceType;
}
