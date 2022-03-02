// prend en paramaetre les méthode qui renvoit un service

import { CryptoServiceType } from "../../services/cryptoService/CryptoService";
import { createCatchErrorMessage, ErrorS } from "../../services/Error";
import { UserRType } from "../../services/UserR/UserR";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export type RegisterServiceType = {
  register: (username: string, password: string) => string | ErrorS;
};

export const registerService = (
  userR: UserRType,
  cryptoService: CryptoServiceType
) => {
  return {
    register: register(userR, cryptoService),
  };
};

export const register =
  (userR: UserRType, cryptoService: CryptoServiceType) =>
  async (username: string, password: string) => {
    try {
      const hashOrError = await cryptoService.hashPassword(password);
      if (hashOrError.type == "error") return hashOrError;
      return await userR.addUser(username, hashOrError.hash);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
