import bcryptjs from "bcryptjs";
import { Message } from "../Message";
export const compareHash = async (
  password: string,
  hash: string
): Promise<Message> => {
  const valid = await bcryptjs.compare(password, hash);
  if (valid) return { message: "mot de passe correct" };
  return { message: "mot de passe incorrect" };
};
