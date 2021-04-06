CREATE ROLE user_anbar LOGIN PASSWORD '135792468';

CREATE ROLE user_anonymous;

GRANT user_anonymous TO user_anbar;

CREATE ROLE user_auth;

GRANT user_auth TO user_anbar;
