-- Type: jwt
CREATE TYPE users.jwt AS (
	role text,
	modules_access jsonb,
	username text,
	userFullName text,
	person_id integer,
	exp bigint
);
-- DROP TYPE USERS.JWT;
-- Type: email 
CREATE DOMAIN users.email AS citext CHECK (
	value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);
-- DROP DOMAIN users.email CASCADE
-- Type: account
CREATE TYPE users.account AS (
	id integer,
	password_hash text,
	email text,
	user_id integer,
	username text,
	userfullname text,
	modules_access jsonb
);
-- DROP TYPE users.account;