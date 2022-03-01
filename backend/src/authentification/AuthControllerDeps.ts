import { CryptoServiceType } from "../services/cryptoService/CryptoServiceType";
import { QueryServiceType } from "../services/queryService/QueryServiceType";
import { TokenServiceType } from "../services/tokenService/TokenServiceType";

// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  queryService: QueryServiceType;
  tokenService: TokenServiceType;
  cryptoService: CryptoServiceType;
}
