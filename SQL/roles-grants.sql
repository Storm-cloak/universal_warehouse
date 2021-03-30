--CREATE GRANTS--
ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;


GRANT EXECUTE ON FUNCTION users.authenticate (text, text) TO user_anonymous, user_auth;
GRANT EXECUTE ON FUNCTION users.register_user (text, text, text, text, text, integer) TO user_anonymous, user_auth;

GRANT usage ON SCHEMA anbar TO user_anonymous, user_auth;
GRANT usage ON SCHEMA users TO user_anonymous, user_auth;
GRANT usage ON SCHEMA client TO user_anonymous, user_auth;
GRANT usage ON SCHEMA cluster TO user_anonymous, user_auth;
GRANT usage ON SCHEMA currency TO user_anonymous, user_auth;
GRANT usage ON SCHEMA inventory TO user_anonymous, user_auth;
GRANT usage ON SCHEMA sellers TO user_anonymous, user_auth;
GRANT usage ON SCHEMA settings TO user_anonymous, user_auth;

GRANT ALL privileges ON TABLE anbar.storages TO user_auth;
GRANT ALL privileges ON TABLE users.users TO user_auth;
GRANT ALL privileges ON TABLE users.user_privelage TO user_auth;


--DROP GRANTS--
ALTER DEFAULT privileges GRANT EXECUTE ON functions TO public;

REVOKE EXECUTE ON FUNCTION users.authenticate (text, text) FROM user_anonymous, user_auth;
REVOKE EXECUTE ON FUNCTION users.register_user (text, text, text, text, text, integer) FROM user_anonymous, user_auth;

REVOKE usage ON SCHEMA users FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA anbar FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA client FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA cluster FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA currency FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA inventory FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA sellers FROM user_anonymous,user_auth;
REVOKE usage ON SCHEMA settings FROM user_anonymous,user_auth;

REVOKE ALL privileges ON TABLE anbar.storages FROM user_auth;
REVOKE ALL privileges ON TABLE users.users FROM user_auth;
REVOKE ALL privileges ON TABLE users.user_privelage FROM user_auth;
