import { Client } from "pg";
import bcryptjs from "bcryptjs";
export const registerService = async (
  client: Client,
  username: string,
  password: string
): Promise<string> => {
  try {
    bcryptjs.hash(password, 10, async (err, hash) => {
      if (err) return err.message;

      const query = {
        text: "password" /*addUserPasswordQuery*/,
        values: [username, hash],
      };

      await client.connect();
      const res = await client.query(query);
      await client.end();
    });
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
  return "client bien enregisrée";
};
