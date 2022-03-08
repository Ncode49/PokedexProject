
/* extentions*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
	user_uuid UUID NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	UNIQUE(username)
);

CREATE TABLE pokemon (
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	UNIQUE(name)
);


CREATE TABLE "like" (
	user_uuid UUID NOT NULL REFERENCES "user"(user_uuid),
	pokemon_id INT NOT NULL REFERENCES pokemon(id),
    UNIQUE(user_uuid),
    UNIQUE(pokemon_id)
);



