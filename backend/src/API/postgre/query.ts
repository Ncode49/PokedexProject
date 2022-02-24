export const selectAllQuery = "select * from users";
export const addUserPasswordQuery =
  "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";

export const findUserByUsername = "SELECT *  FROM users WHERE username = $1";
