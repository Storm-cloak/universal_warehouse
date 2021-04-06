CREATE FUNCTION users.register_user(firstname text, surname text, username text, email text, password text,user_privelage_id int)
	RETURNS users.users
	AS $$
DECLARE
	person users.users;
BEGIN
	INSERT INTO users.users(firstname,surname,username,user_privelage_id) 
		VALUES (firstname,surname,username,user_privelage_id)
	RETURNING 
		* INTO person;
	INSERT INTO private_users.users_account(user_id, email, password_hash)
		VALUES(person.id, email, crypt(password, gen_salt('bf')));
	RETURN person;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;

-- DROP FUNCTION users.register_user
