CREATE FUNCTION users.authenticate (username text, password text)
	RETURNS users.jwt
	AS $$
DECLARE 
account users.account;
BEGIN
	SELECT 
	ua.*,up.modules_access INTO account
	FROM
		private_users.users_account ua
	LEFT JOIN 
		users.users u ON u.id = ua.user_id
	LEFT JOIN 
		users.user_privelage up ON up.id = u.user_privelage_id
	WHERE
		u.username = authenticate.username;
	IF account.password_hash = crypt(password, account.password_hash) THEN
		RETURN ('user_auth',
			account.modules_access,
			account.user_id,
			extract(epoch FROM (now() + interval '1 hour')))::users.jwt;
	ELSE
		RETURN NULL;
	END IF;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;	

-- DROP FUNCTION users.authenticate