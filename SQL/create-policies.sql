ALTER TABLE users.users enable ROW level SECURITY;

CREATE POLICY select_products ON users.users FOR SELECT TO user_auth USING
  (id = nullif (current_setting('jwt.claims.person_id', TRUE),
  '')::integer);
  
DROP POLICY select_products ON users.users;
ALTER TABLE users.users disable ROW level SECURITY;

