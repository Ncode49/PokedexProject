import bcryptjs from "bcryptjs";
export class CryptoPasswordService {
  constructor() {}

  async comparePasswordHash(password: string, hash: string) {
    try {
      const valid = await bcryptjs.compare(password, hash);
      //
      if (valid) {
        return "password";
      }
    } catch (error) {
      // erreur du service 500 ??
    }
  }
}
