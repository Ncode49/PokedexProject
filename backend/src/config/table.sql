
/* extentions*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
	user_uuid UUID NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
	password_hash VARCHAR(100) NOT NULL,
	UNIQUE(username)
);
/*id ou slug les deux marchent slug (nom par exemple a voir si pas duplication)*/
CREATE TABLE "like" (
	user_uuid UUID NOT NULL REFERENCES "user"(user_uuid),
	pokemon_id INT NOT NULL, 
    UNIQUE(user_uuid,pokemon_id)
);


DROP TABLE "like";
DROP TABLE "user";