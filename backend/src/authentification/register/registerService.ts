// prend en paramaetre les méthode qui renvoit un service

import { CryptoServiceType } from "../../services/cryptoService/CryptoService";
import { createCatchErrorMessage, ErrorS } from "../../services/Error";
import { QueryServiceType } from "../../services/queryService/QueryService";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export type RegisterServiceType = {
  register: (username: string, password: string) => string | ErrorS;
};

export const registerService = (
  queryService: QueryServiceType,
  cryptoService: CryptoServiceType
) => {
  return {
    register: register(queryService, cryptoService),
  };
};

export const register =
  (queryService: QueryServiceType, cryptoService: CryptoServiceType) =>
  async (username: string, password: string) => {
    try {
      const hashOrError = await cryptoService.hashPassword(password);
      if (typeof hashOrError === "string") {
        const message = await queryService.addUser(username, hashOrError);
      }
      return hashOrError;
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
