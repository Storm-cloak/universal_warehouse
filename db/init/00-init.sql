--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)

-- Started on 2021-03-30 09:20:38 +04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 14 (class 2615 OID 98973)
-- Name: anbar; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA anbar;


ALTER SCHEMA anbar OWNER TO "postgres";

--
-- TOC entry 16 (class 2615 OID 98977)
-- Name: client; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA client;


ALTER SCHEMA client OWNER TO "postgres";

--
-- TOC entry 17 (class 2615 OID 98974)
-- Name: cluster; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA cluster;


ALTER SCHEMA cluster OWNER TO "postgres";

--
-- TOC entry 18 (class 2615 OID 98975)
-- Name: currency; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA currency;


ALTER SCHEMA currency OWNER TO "postgres";

--
-- TOC entry 19 (class 2615 OID 98976)
-- Name: inventory; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA inventory;


ALTER SCHEMA inventory OWNER TO "postgres";

--
-- TOC entry 13 (class 2615 OID 102166)
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA postgraphile_watch;


ALTER SCHEMA postgraphile_watch OWNER TO "postgres";

--
-- TOC entry 8 (class 2615 OID 98979)
-- Name: private_users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA private_users;


ALTER SCHEMA private_users OWNER TO "postgres";

--
-- TOC entry 20 (class 2615 OID 98981)
-- Name: sellers; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA sellers;


ALTER SCHEMA sellers OWNER TO "postgres";

--
-- TOC entry 21 (class 2615 OID 98980)
-- Name: settings; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA settings;


ALTER SCHEMA settings OWNER TO "postgres";

--
-- TOC entry 15 (class 2615 OID 98978)
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO "postgres";

--
-- TOC entry 2 (class 3079 OID 101162)
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- TOC entry 3 (class 3079 OID 99894)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 768 (class 1247 OID 101889)
-- Name: account; Type: TYPE; Schema: users; Owner: postgres
--

CREATE TYPE users.account AS (
	id integer,
	password_hash text,
	email text,
	user_id integer,
	modules_access jsonb
);


ALTER TYPE users.account OWNER TO postgres;

--
-- TOC entry 764 (class 1247 OID 101885)
-- Name: email; Type: DOMAIN; Schema: users; Owner: postgres
--

CREATE DOMAIN users.email AS public.citext
	CONSTRAINT email_check CHECK ((VALUE OPERATOR(public.~) '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::public.citext));


ALTER DOMAIN users.email OWNER TO postgres;

--
-- TOC entry 761 (class 1247 OID 101883)
-- Name: jwt; Type: TYPE; Schema: users; Owner: postgres
--

CREATE TYPE users.jwt AS (
	role text,
	modules_access jsonb,
	person_id integer,
	exp bigint
);


ALTER TYPE users.jwt OWNER TO postgres;

--
-- TOC entry 346 (class 1255 OID 102167)
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: postgres
--

CREATE FUNCTION postgraphile_watch.notify_watchers_ddl() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'ddl',
      'payload',
      (select json_agg(json_build_object('schema', schema_name, 'command', command_tag)) from pg_event_trigger_ddl_commands() as x)
    )::text
  );
end;
$$;


ALTER FUNCTION postgraphile_watch.notify_watchers_ddl() OWNER TO "postgres";

--
-- TOC entry 347 (class 1255 OID 102168)
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: postgres
--

CREATE FUNCTION postgraphile_watch.notify_watchers_drop() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'drop',
      'payload',
      (select json_agg(distinct x.schema_name) from pg_event_trigger_dropped_objects() as x)
    )::text
  );
end;
$$;


ALTER FUNCTION postgraphile_watch.notify_watchers_drop() OWNER TO "postgres";

--
-- TOC entry 348 (class 1255 OID 102148)
-- Name: authenticate(text, text); Type: FUNCTION; Schema: users; Owner: postgres
--

CREATE FUNCTION users.authenticate(username text, password text) RETURNS users.jwt
    LANGUAGE plpgsql STRICT SECURITY DEFINER
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
$$;


ALTER FUNCTION users.authenticate(username text, password text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 247 (class 1259 OID 102018)
-- Name: users; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users (
    id integer NOT NULL,
    username text NOT NULL,
    firstname text NOT NULL,
    surname text NOT NULL,
    user_privelage_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE users.users OWNER TO postgres;

--
-- TOC entry 349 (class 1255 OID 102149)
-- Name: register_user(text, text, text, text, text, integer); Type: FUNCTION; Schema: users; Owner: postgres
--

CREATE FUNCTION users.register_user(firstname text, surname text, username text, email text, password text, user_privelage_id integer) RETURNS users.users
    LANGUAGE plpgsql STRICT SECURITY DEFINER
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
$$;


ALTER FUNCTION users.register_user(firstname text, surname text, username text, email text, password text, user_privelage_id integer) OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 101977)
-- Name: main; Type: TABLE; Schema: anbar; Owner: postgres
--

CREATE TABLE anbar.main (
    id integer NOT NULL,
    session_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision NOT NULL,
    delete_this_result smallint NOT NULL,
    price double precision NOT NULL,
    netto_price double precision,
    prod_date date,
    exp_date date,
    product_cell text,
    document_id text NOT NULL,
    document_parent_id text,
    currency_id integer NOT NULL,
    margin double precision,
    clusters_id integer NOT NULL,
    netto_weight double precision,
    brutto_weight double precision,
    inventory_array jsonb NOT NULL
);


ALTER TABLE anbar.main OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 101975)
-- Name: main_id_seq; Type: SEQUENCE; Schema: anbar; Owner: postgres
--

ALTER TABLE anbar.main ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME anbar.main_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 243 (class 1259 OID 101998)
-- Name: sessions; Type: TABLE; Schema: anbar; Owner: postgres
--

CREATE TABLE anbar.sessions (
    id integer NOT NULL,
    parent_id integer NOT NULL,
    is_done bit(1) NOT NULL,
    begin_date timestamp without time zone NOT NULL,
    invoice_num text,
    product_seller_id integer,
    storage_id integer NOT NULL,
    electron_receipt text,
    type smallint NOT NULL
);


ALTER TABLE anbar.sessions OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 101996)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: anbar; Owner: postgres
--

ALTER TABLE anbar.sessions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME anbar.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 245 (class 1259 OID 102008)
-- Name: storages; Type: TABLE; Schema: anbar; Owner: postgres
--

CREATE TABLE anbar.storages (
    id integer NOT NULL,
    storage_name jsonb NOT NULL,
    storage_type integer NOT NULL,
    responsible_person_id integer NOT NULL
);


ALTER TABLE anbar.storages OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 102006)
-- Name: storages_id_seq; Type: SEQUENCE; Schema: anbar; Owner: postgres
--

ALTER TABLE anbar.storages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME anbar.storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 253 (class 1259 OID 102053)
-- Name: warehouse; Type: TABLE; Schema: anbar; Owner: postgres
--

CREATE TABLE anbar.warehouse (
    id integer NOT NULL,
    title jsonb NOT NULL,
    title2 jsonb NOT NULL,
    parent_id integer NOT NULL,
    cluster_id integer NOT NULL,
    cluster_order_default_id integer NOT NULL,
    barcode text NOT NULL,
    min_quantity double precision,
    optimal_quantity double precision,
    exp_date_warning integer,
    image_link text,
    is_weight bit(1) DEFAULT '0'::"bit" NOT NULL,
    is_inventory bit(1) DEFAULT '0'::"bit" NOT NULL,
    storage_id integer NOT NULL,
    measure_by bit(2),
    margin_default double precision
);


ALTER TABLE anbar.warehouse OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 102051)
-- Name: warehouse_id_seq; Type: SEQUENCE; Schema: anbar; Owner: postgres
--

ALTER TABLE anbar.warehouse ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME anbar.warehouse_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 101899)
-- Name: clients; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client.clients (
    id integer NOT NULL,
    firstname text,
    lastname text,
    is_active bit(1) NOT NULL,
    phonenumber text,
    p_address text
);


ALTER TABLE client.clients OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 101897)
-- Name: clients_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

ALTER TABLE client.clients ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME client.clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 101909)
-- Name: clients_shopping; Type: TABLE; Schema: client; Owner: postgres
--

CREATE TABLE client.clients_shopping (
    id integer NOT NULL,
    client_id integer NOT NULL,
    session_id integer NOT NULL,
    dept double precision NOT NULL
);


ALTER TABLE client.clients_shopping OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 101907)
-- Name: clients_shopping_id_seq; Type: SEQUENCE; Schema: client; Owner: postgres
--

ALTER TABLE client.clients_shopping ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME client.clients_shopping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 101916)
-- Name: clusters; Type: TABLE; Schema: cluster; Owner: postgres
--

CREATE TABLE cluster.clusters (
    id integer NOT NULL,
    cluster_id integer NOT NULL,
    cluster_order integer NOT NULL,
    capacity integer NOT NULL,
    clusters_name_id integer NOT NULL
);


ALTER TABLE cluster.clusters OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 101914)
-- Name: clusters_id_seq; Type: SEQUENCE; Schema: cluster; Owner: postgres
--

ALTER TABLE cluster.clusters ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cluster.clusters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 101923)
-- Name: clusters_title; Type: TABLE; Schema: cluster; Owner: postgres
--

CREATE TABLE cluster.clusters_title (
    id integer NOT NULL,
    title jsonb NOT NULL,
    package_weight double precision
);


ALTER TABLE cluster.clusters_title OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 101921)
-- Name: clusters_title_id_seq; Type: SEQUENCE; Schema: cluster; Owner: postgres
--

ALTER TABLE cluster.clusters_title ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cluster.clusters_title_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 101933)
-- Name: currency_exchange_rate; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.currency_exchange_rate (
    id integer NOT NULL,
    title_id integer NOT NULL,
    value double precision NOT NULL,
    "time" timestamp without time zone NOT NULL
);


ALTER TABLE currency.currency_exchange_rate OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 101931)
-- Name: currency_exchange_rate_id_seq; Type: SEQUENCE; Schema: currency; Owner: postgres
--

ALTER TABLE currency.currency_exchange_rate ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME currency.currency_exchange_rate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 101940)
-- Name: currency_title; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.currency_title (
    id integer NOT NULL,
    short_title text NOT NULL,
    full_title jsonb NOT NULL
);


ALTER TABLE currency.currency_title OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 101938)
-- Name: currency_title_id_seq; Type: SEQUENCE; Schema: currency; Owner: postgres
--

ALTER TABLE currency.currency_title ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME currency.currency_title_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 101950)
-- Name: inventory; Type: TABLE; Schema: inventory; Owner: postgres
--

CREATE TABLE inventory.inventory (
    id integer NOT NULL,
    inventory_id integer NOT NULL,
    product_id integer NOT NULL,
    real_quantity double precision NOT NULL,
    storage_quantity double precision NOT NULL
);


ALTER TABLE inventory.inventory OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 101957)
-- Name: inventory_desc; Type: TABLE; Schema: inventory; Owner: postgres
--

CREATE TABLE inventory.inventory_desc (
    id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone,
    comment text
);


ALTER TABLE inventory.inventory_desc OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 101955)
-- Name: inventory_desc_id_seq; Type: SEQUENCE; Schema: inventory; Owner: postgres
--

ALTER TABLE inventory.inventory_desc ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME inventory.inventory_desc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 101948)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: inventory; Owner: postgres
--

ALTER TABLE inventory.inventory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME inventory.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 251 (class 1259 OID 102041)
-- Name: users_account; Type: TABLE; Schema: private_users; Owner: postgres
--

CREATE TABLE private_users.users_account (
    id integer NOT NULL,
    password_hash text NOT NULL,
    email users.email NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE private_users.users_account OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 102039)
-- Name: users_account_id_seq; Type: SEQUENCE; Schema: private_users; Owner: postgres
--

ALTER TABLE private_users.users_account ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME private_users.users_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 101987)
-- Name: product_sellers; Type: TABLE; Schema: sellers; Owner: postgres
--

CREATE TABLE sellers.product_sellers (
    id integer NOT NULL,
    seller_title text NOT NULL,
    firstname text NOT NULL,
    surname text NOT NULL,
    is_active bit(1) DEFAULT '1'::"bit" NOT NULL,
    p_address text NOT NULL,
    phonenumber text NOT NULL
);


ALTER TABLE sellers.product_sellers OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 101985)
-- Name: product_sellers_id_seq; Type: SEQUENCE; Schema: sellers; Owner: postgres
--

ALTER TABLE sellers.product_sellers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME sellers.product_sellers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 101892)
-- Name: app_settings; Type: TABLE; Schema: settings; Owner: postgres
--

CREATE TABLE settings.app_settings (
    id integer NOT NULL,
    default_currency integer NOT NULL,
    default_language integer NOT NULL,
    netto_brutto bit(2) NOT NULL
);


ALTER TABLE settings.app_settings OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 101890)
-- Name: app_settings_id_seq; Type: SEQUENCE; Schema: settings; Owner: postgres
--

ALTER TABLE settings.app_settings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME settings.app_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 237 (class 1259 OID 101967)
-- Name: languages; Type: TABLE; Schema: settings; Owner: postgres
--

CREATE TABLE settings.languages (
    id integer NOT NULL,
    short_title text NOT NULL,
    full_title text NOT NULL
);


ALTER TABLE settings.languages OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 101965)
-- Name: languages_id_seq; Type: SEQUENCE; Schema: settings; Owner: postgres
--

ALTER TABLE settings.languages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME settings.languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 249 (class 1259 OID 102031)
-- Name: user_privelage; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_privelage (
    id integer NOT NULL,
    privelage_name text NOT NULL,
    modules_access jsonb NOT NULL
);


ALTER TABLE users.user_privelage OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 102029)
-- Name: user_privelage_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

ALTER TABLE users.user_privelage ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME users.user_privelage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 246 (class 1259 OID 102016)
-- Name: users_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

ALTER TABLE users.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME users.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3345 (class 0 OID 101977)
-- Dependencies: 239
-- Data for Name: main; Type: TABLE DATA; Schema: anbar; Owner: postgres
--

COPY anbar.main (id, session_id, product_id, quantity, delete_this_result, price, netto_price, prod_date, exp_date, product_cell, document_id, document_parent_id, currency_id, margin, clusters_id, netto_weight, brutto_weight, inventory_array) FROM stdin;
\.


--
-- TOC entry 3349 (class 0 OID 101998)
-- Dependencies: 243
-- Data for Name: sessions; Type: TABLE DATA; Schema: anbar; Owner: postgres
--

COPY anbar.sessions (id, parent_id, is_done, begin_date, invoice_num, product_seller_id, storage_id, electron_receipt, type) FROM stdin;
\.


--
-- TOC entry 3351 (class 0 OID 102008)
-- Dependencies: 245
-- Data for Name: storages; Type: TABLE DATA; Schema: anbar; Owner: postgres
--

COPY anbar.storages (id, storage_name, storage_type, responsible_person_id) FROM stdin;
\.


--
-- TOC entry 3359 (class 0 OID 102053)
-- Dependencies: 253
-- Data for Name: warehouse; Type: TABLE DATA; Schema: anbar; Owner: postgres
--

COPY anbar.warehouse (id, title, title2, parent_id, cluster_id, cluster_order_default_id, barcode, min_quantity, optimal_quantity, exp_date_warning, image_link, is_weight, is_inventory, storage_id, measure_by, margin_default) FROM stdin;
\.


--
-- TOC entry 3327 (class 0 OID 101899)
-- Dependencies: 221
-- Data for Name: clients; Type: TABLE DATA; Schema: client; Owner: postgres
--

COPY client.clients (id, firstname, lastname, is_active, phonenumber, p_address) FROM stdin;
\.


--
-- TOC entry 3329 (class 0 OID 101909)
-- Dependencies: 223
-- Data for Name: clients_shopping; Type: TABLE DATA; Schema: client; Owner: postgres
--

COPY client.clients_shopping (id, client_id, session_id, dept) FROM stdin;
\.


--
-- TOC entry 3331 (class 0 OID 101916)
-- Dependencies: 225
-- Data for Name: clusters; Type: TABLE DATA; Schema: cluster; Owner: postgres
--

COPY cluster.clusters (id, cluster_id, cluster_order, capacity, clusters_name_id) FROM stdin;
\.


--
-- TOC entry 3333 (class 0 OID 101923)
-- Dependencies: 227
-- Data for Name: clusters_title; Type: TABLE DATA; Schema: cluster; Owner: postgres
--

COPY cluster.clusters_title (id, title, package_weight) FROM stdin;
\.


--
-- TOC entry 3335 (class 0 OID 101933)
-- Dependencies: 229
-- Data for Name: currency_exchange_rate; Type: TABLE DATA; Schema: currency; Owner: postgres
--

COPY currency.currency_exchange_rate (id, title_id, value, "time") FROM stdin;
\.


--
-- TOC entry 3337 (class 0 OID 101940)
-- Dependencies: 231
-- Data for Name: currency_title; Type: TABLE DATA; Schema: currency; Owner: postgres
--

COPY currency.currency_title (id, short_title, full_title) FROM stdin;
\.


--
-- TOC entry 3339 (class 0 OID 101950)
-- Dependencies: 233
-- Data for Name: inventory; Type: TABLE DATA; Schema: inventory; Owner: postgres
--

COPY inventory.inventory (id, inventory_id, product_id, real_quantity, storage_quantity) FROM stdin;
\.


--
-- TOC entry 3341 (class 0 OID 101957)
-- Dependencies: 235
-- Data for Name: inventory_desc; Type: TABLE DATA; Schema: inventory; Owner: postgres
--

COPY inventory.inventory_desc (id, start_date, end_date, comment) FROM stdin;
\.


--
-- TOC entry 3357 (class 0 OID 102041)
-- Dependencies: 251
-- Data for Name: users_account; Type: TABLE DATA; Schema: private_users; Owner: postgres
--

COPY private_users.users_account (id, password_hash, email, user_id) FROM stdin;
1	$2a$06$afxTo3IimmgzWhn0rup96OzntWnCcUgih2dee15EeGLS/kMK2lj9u	akakiy.87@mail.ru	1
\.


--
-- TOC entry 3347 (class 0 OID 101987)
-- Dependencies: 241
-- Data for Name: product_sellers; Type: TABLE DATA; Schema: sellers; Owner: postgres
--

COPY sellers.product_sellers (id, seller_title, firstname, surname, is_active, p_address, phonenumber) FROM stdin;
\.


--
-- TOC entry 3325 (class 0 OID 101892)
-- Dependencies: 219
-- Data for Name: app_settings; Type: TABLE DATA; Schema: settings; Owner: postgres
--

COPY settings.app_settings (id, default_currency, default_language, netto_brutto) FROM stdin;
\.


--
-- TOC entry 3343 (class 0 OID 101967)
-- Dependencies: 237
-- Data for Name: languages; Type: TABLE DATA; Schema: settings; Owner: postgres
--

COPY settings.languages (id, short_title, full_title) FROM stdin;
\.


--
-- TOC entry 3355 (class 0 OID 102031)
-- Dependencies: 249
-- Data for Name: user_privelage; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_privelage (id, privelage_name, modules_access) FROM stdin;
1	Admin	{"Modules": "ALL"}
\.


--
-- TOC entry 3353 (class 0 OID 102018)
-- Dependencies: 247
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users (id, username, firstname, surname, user_privelage_id, created_at) FROM stdin;
1	postgres	Rustam	Agh	1	2021-03-19 15:23:35.871544+04
\.


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 238
-- Name: main_id_seq; Type: SEQUENCE SET; Schema: anbar; Owner: postgres
--

SELECT pg_catalog.setval('anbar.main_id_seq', 1, false);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 242
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: anbar; Owner: postgres
--

SELECT pg_catalog.setval('anbar.sessions_id_seq', 1, false);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 244
-- Name: storages_id_seq; Type: SEQUENCE SET; Schema: anbar; Owner: postgres
--

SELECT pg_catalog.setval('anbar.storages_id_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 252
-- Name: warehouse_id_seq; Type: SEQUENCE SET; Schema: anbar; Owner: postgres
--

SELECT pg_catalog.setval('anbar.warehouse_id_seq', 1, false);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 220
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client.clients_id_seq', 1, false);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 222
-- Name: clients_shopping_id_seq; Type: SEQUENCE SET; Schema: client; Owner: postgres
--

SELECT pg_catalog.setval('client.clients_shopping_id_seq', 1, false);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 224
-- Name: clusters_id_seq; Type: SEQUENCE SET; Schema: cluster; Owner: postgres
--

SELECT pg_catalog.setval('cluster.clusters_id_seq', 1, false);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 226
-- Name: clusters_title_id_seq; Type: SEQUENCE SET; Schema: cluster; Owner: postgres
--

SELECT pg_catalog.setval('cluster.clusters_title_id_seq', 1, false);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 228
-- Name: currency_exchange_rate_id_seq; Type: SEQUENCE SET; Schema: currency; Owner: postgres
--

SELECT pg_catalog.setval('currency.currency_exchange_rate_id_seq', 1, false);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 230
-- Name: currency_title_id_seq; Type: SEQUENCE SET; Schema: currency; Owner: postgres
--

SELECT pg_catalog.setval('currency.currency_title_id_seq', 1, false);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 234
-- Name: inventory_desc_id_seq; Type: SEQUENCE SET; Schema: inventory; Owner: postgres
--

SELECT pg_catalog.setval('inventory.inventory_desc_id_seq', 1, false);


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 232
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: inventory; Owner: postgres
--

SELECT pg_catalog.setval('inventory.inventory_id_seq', 1, false);


--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 250
-- Name: users_account_id_seq; Type: SEQUENCE SET; Schema: private_users; Owner: postgres
--

SELECT pg_catalog.setval('private_users.users_account_id_seq', 1, true);


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 240
-- Name: product_sellers_id_seq; Type: SEQUENCE SET; Schema: sellers; Owner: postgres
--

SELECT pg_catalog.setval('sellers.product_sellers_id_seq', 1, false);


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 218
-- Name: app_settings_id_seq; Type: SEQUENCE SET; Schema: settings; Owner: postgres
--

SELECT pg_catalog.setval('settings.app_settings_id_seq', 1, false);


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 236
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: settings; Owner: postgres
--

SELECT pg_catalog.setval('settings.languages_id_seq', 1, false);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 248
-- Name: user_privelage_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.user_privelage_id_seq', 1, true);


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 246
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_id_seq', 1, true);


--
-- TOC entry 3158 (class 2606 OID 101984)
-- Name: main main_pk; Type: CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.main
    ADD CONSTRAINT main_pk PRIMARY KEY (id);


--
-- TOC entry 3162 (class 2606 OID 102005)
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- TOC entry 3164 (class 2606 OID 102015)
-- Name: storages storages_pk; Type: CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.storages
    ADD CONSTRAINT storages_pk PRIMARY KEY (id);


--
-- TOC entry 3176 (class 2606 OID 102062)
-- Name: warehouse warehouse_pk; Type: CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.warehouse
    ADD CONSTRAINT warehouse_pk PRIMARY KEY (id);


--
-- TOC entry 3140 (class 2606 OID 101906)
-- Name: clients clients_pk; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.clients
    ADD CONSTRAINT clients_pk PRIMARY KEY (id);


--
-- TOC entry 3142 (class 2606 OID 101913)
-- Name: clients_shopping clients_shopping_pk; Type: CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.clients_shopping
    ADD CONSTRAINT clients_shopping_pk PRIMARY KEY (id, dept);


--
-- TOC entry 3144 (class 2606 OID 101920)
-- Name: clusters clusters_pk; Type: CONSTRAINT; Schema: cluster; Owner: postgres
--

ALTER TABLE ONLY cluster.clusters
    ADD CONSTRAINT clusters_pk PRIMARY KEY (id);


--
-- TOC entry 3146 (class 2606 OID 101930)
-- Name: clusters_title clusters_title_pk; Type: CONSTRAINT; Schema: cluster; Owner: postgres
--

ALTER TABLE ONLY cluster.clusters_title
    ADD CONSTRAINT clusters_title_pk PRIMARY KEY (id);


--
-- TOC entry 3148 (class 2606 OID 101937)
-- Name: currency_exchange_rate currency_exchange_rate_pk; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.currency_exchange_rate
    ADD CONSTRAINT currency_exchange_rate_pk PRIMARY KEY (id);


--
-- TOC entry 3150 (class 2606 OID 101947)
-- Name: currency_title currency_title_pk; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.currency_title
    ADD CONSTRAINT currency_title_pk PRIMARY KEY (id);


--
-- TOC entry 3154 (class 2606 OID 101964)
-- Name: inventory_desc inventory_desc_pk; Type: CONSTRAINT; Schema: inventory; Owner: postgres
--

ALTER TABLE ONLY inventory.inventory_desc
    ADD CONSTRAINT inventory_desc_pk PRIMARY KEY (id);


--
-- TOC entry 3152 (class 2606 OID 101954)
-- Name: inventory inventory_pk; Type: CONSTRAINT; Schema: inventory; Owner: postgres
--

ALTER TABLE ONLY inventory.inventory
    ADD CONSTRAINT inventory_pk PRIMARY KEY (id);


--
-- TOC entry 3172 (class 2606 OID 102050)
-- Name: users_account users_account_email_key; Type: CONSTRAINT; Schema: private_users; Owner: postgres
--

ALTER TABLE ONLY private_users.users_account
    ADD CONSTRAINT users_account_email_key UNIQUE (email);


--
-- TOC entry 3174 (class 2606 OID 102048)
-- Name: users_account users_account_pk; Type: CONSTRAINT; Schema: private_users; Owner: postgres
--

ALTER TABLE ONLY private_users.users_account
    ADD CONSTRAINT users_account_pk PRIMARY KEY (id);


--
-- TOC entry 3160 (class 2606 OID 101995)
-- Name: product_sellers product_sellers_pk; Type: CONSTRAINT; Schema: sellers; Owner: postgres
--

ALTER TABLE ONLY sellers.product_sellers
    ADD CONSTRAINT product_sellers_pk PRIMARY KEY (id);


--
-- TOC entry 3138 (class 2606 OID 101896)
-- Name: app_settings app_settings_pk; Type: CONSTRAINT; Schema: settings; Owner: postgres
--

ALTER TABLE ONLY settings.app_settings
    ADD CONSTRAINT app_settings_pk PRIMARY KEY (id);


--
-- TOC entry 3156 (class 2606 OID 101974)
-- Name: languages languages_pk; Type: CONSTRAINT; Schema: settings; Owner: postgres
--

ALTER TABLE ONLY settings.languages
    ADD CONSTRAINT languages_pk PRIMARY KEY (id);


--
-- TOC entry 3170 (class 2606 OID 102038)
-- Name: user_privelage user_privelage_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_privelage
    ADD CONSTRAINT user_privelage_pk PRIMARY KEY (id);


--
-- TOC entry 3166 (class 2606 OID 102026)
-- Name: users users_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3168 (class 2606 OID 102028)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3184 (class 2606 OID 102098)
-- Name: main main_currency_title; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.main
    ADD CONSTRAINT main_currency_title FOREIGN KEY (currency_id) REFERENCES currency.currency_title(id);


--
-- TOC entry 3185 (class 2606 OID 102103)
-- Name: main main_sessions; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.main
    ADD CONSTRAINT main_sessions FOREIGN KEY (session_id) REFERENCES anbar.sessions(id);


--
-- TOC entry 3186 (class 2606 OID 102108)
-- Name: main main_warehouse; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.main
    ADD CONSTRAINT main_warehouse FOREIGN KEY (product_id) REFERENCES anbar.warehouse(id);


--
-- TOC entry 3187 (class 2606 OID 102113)
-- Name: sessions sessions_product_sellers; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.sessions
    ADD CONSTRAINT sessions_product_sellers FOREIGN KEY (product_seller_id) REFERENCES sellers.product_sellers(id);


--
-- TOC entry 3188 (class 2606 OID 102118)
-- Name: sessions sessions_storages; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.sessions
    ADD CONSTRAINT sessions_storages FOREIGN KEY (storage_id) REFERENCES anbar.storages(id);


--
-- TOC entry 3189 (class 2606 OID 102123)
-- Name: storages storages_users; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.storages
    ADD CONSTRAINT storages_users FOREIGN KEY (responsible_person_id) REFERENCES users.users(id);


--
-- TOC entry 3192 (class 2606 OID 102138)
-- Name: warehouse warehouse_clusters; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.warehouse
    ADD CONSTRAINT warehouse_clusters FOREIGN KEY (cluster_id) REFERENCES cluster.clusters(id);


--
-- TOC entry 3193 (class 2606 OID 102143)
-- Name: warehouse warehouse_storages; Type: FK CONSTRAINT; Schema: anbar; Owner: postgres
--

ALTER TABLE ONLY anbar.warehouse
    ADD CONSTRAINT warehouse_storages FOREIGN KEY (storage_id) REFERENCES anbar.storages(id);


--
-- TOC entry 3179 (class 2606 OID 102073)
-- Name: clients_shopping clients_shopping_clients; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.clients_shopping
    ADD CONSTRAINT clients_shopping_clients FOREIGN KEY (client_id) REFERENCES client.clients(id);


--
-- TOC entry 3180 (class 2606 OID 102078)
-- Name: clients_shopping clients_shopping_sessions; Type: FK CONSTRAINT; Schema: client; Owner: postgres
--

ALTER TABLE ONLY client.clients_shopping
    ADD CONSTRAINT clients_shopping_sessions FOREIGN KEY (session_id) REFERENCES anbar.sessions(id);


--
-- TOC entry 3181 (class 2606 OID 102083)
-- Name: clusters clusters_clusters_name; Type: FK CONSTRAINT; Schema: cluster; Owner: postgres
--

ALTER TABLE ONLY cluster.clusters
    ADD CONSTRAINT clusters_clusters_name FOREIGN KEY (clusters_name_id) REFERENCES cluster.clusters_title(id);


--
-- TOC entry 3182 (class 2606 OID 102088)
-- Name: currency_exchange_rate currency_exchange_rate_currency_title; Type: FK CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.currency_exchange_rate
    ADD CONSTRAINT currency_exchange_rate_currency_title FOREIGN KEY (title_id) REFERENCES currency.currency_title(id);


--
-- TOC entry 3183 (class 2606 OID 102093)
-- Name: inventory inventory_invetory_desc; Type: FK CONSTRAINT; Schema: inventory; Owner: postgres
--

ALTER TABLE ONLY inventory.inventory
    ADD CONSTRAINT inventory_invetory_desc FOREIGN KEY (inventory_id) REFERENCES inventory.inventory_desc(id);


--
-- TOC entry 3191 (class 2606 OID 102128)
-- Name: users_account users_account_users; Type: FK CONSTRAINT; Schema: private_users; Owner: postgres
--

ALTER TABLE ONLY private_users.users_account
    ADD CONSTRAINT users_account_users FOREIGN KEY (user_id) REFERENCES users.users(id);


--
-- TOC entry 3177 (class 2606 OID 102063)
-- Name: app_settings app_settings_currency_title; Type: FK CONSTRAINT; Schema: settings; Owner: postgres
--

ALTER TABLE ONLY settings.app_settings
    ADD CONSTRAINT app_settings_currency_title FOREIGN KEY (default_currency) REFERENCES currency.currency_title(id);


--
-- TOC entry 3178 (class 2606 OID 102068)
-- Name: app_settings app_settings_languages; Type: FK CONSTRAINT; Schema: settings; Owner: postgres
--

ALTER TABLE ONLY settings.app_settings
    ADD CONSTRAINT app_settings_languages FOREIGN KEY (default_language) REFERENCES settings.languages(id);


--
-- TOC entry 3190 (class 2606 OID 102133)
-- Name: users users_user_privelage; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_user_privelage FOREIGN KEY (user_privelage_id) REFERENCES users.user_privelage(id);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA anbar; Type: ACL; Schema: -; Owner: postgres
--

CREATE ROLE user_anbar LOGIN PASSWORD '135792468';

CREATE ROLE user_anonymous;

GRANT user_anonymous TO user_anbar;

CREATE ROLE user_auth;

GRANT user_auth TO user_anbar;


GRANT USAGE ON SCHEMA anbar TO user_anonymous;
GRANT USAGE ON SCHEMA anbar TO user_auth;


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 16
-- Name: SCHEMA client; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA client TO user_anonymous;
GRANT USAGE ON SCHEMA client TO user_auth;


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 17
-- Name: SCHEMA cluster; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA cluster TO user_anonymous;
GRANT USAGE ON SCHEMA cluster TO user_auth;


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 18
-- Name: SCHEMA currency; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA currency TO user_anonymous;
GRANT USAGE ON SCHEMA currency TO user_auth;


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 19
-- Name: SCHEMA inventory; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA inventory TO user_anonymous;
GRANT USAGE ON SCHEMA inventory TO user_auth;


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 20
-- Name: SCHEMA sellers; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA sellers TO user_anonymous;
GRANT USAGE ON SCHEMA sellers TO user_auth;


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 21
-- Name: SCHEMA settings; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA settings TO user_anonymous;
GRANT USAGE ON SCHEMA settings TO user_auth;


--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 15
-- Name: SCHEMA users; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA users TO user_anonymous;
GRANT USAGE ON SCHEMA users TO user_auth;


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 301
-- Name: FUNCTION citextin(cstring); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citextin(cstring) FROM PUBLIC;


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 302
-- Name: FUNCTION citextout(public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citextout(public.citext) FROM PUBLIC;


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 303
-- Name: FUNCTION citextrecv(internal); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citextrecv(internal) FROM PUBLIC;


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 304
-- Name: FUNCTION citextsend(public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citextsend(public.citext) FROM PUBLIC;


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 320
-- Name: FUNCTION texticregexeq(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticregexeq(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 306
-- Name: FUNCTION citext(boolean); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext(boolean) FROM PUBLIC;


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 305
-- Name: FUNCTION citext(character); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext(character) FROM PUBLIC;


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 307
-- Name: FUNCTION citext(inet); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext(inet) FROM PUBLIC;


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 314
-- Name: FUNCTION citext_cmp(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_cmp(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 308
-- Name: FUNCTION citext_eq(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_eq(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 313
-- Name: FUNCTION citext_ge(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_ge(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 312
-- Name: FUNCTION citext_gt(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_gt(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 315
-- Name: FUNCTION citext_hash(public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_hash(public.citext) FROM PUBLIC;


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 345
-- Name: FUNCTION citext_hash_extended(public.citext, bigint); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_hash_extended(public.citext, bigint) FROM PUBLIC;


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 317
-- Name: FUNCTION citext_larger(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_larger(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 311
-- Name: FUNCTION citext_le(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_le(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 310
-- Name: FUNCTION citext_lt(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_lt(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 309
-- Name: FUNCTION citext_ne(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_ne(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 344
-- Name: FUNCTION citext_pattern_cmp(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_pattern_cmp(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 343
-- Name: FUNCTION citext_pattern_ge(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_pattern_ge(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 342
-- Name: FUNCTION citext_pattern_gt(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_pattern_gt(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 341
-- Name: FUNCTION citext_pattern_le(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_pattern_le(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 340
-- Name: FUNCTION citext_pattern_lt(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_pattern_lt(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 316
-- Name: FUNCTION citext_smaller(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.citext_smaller(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 326
-- Name: FUNCTION regexp_match(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_match(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 327
-- Name: FUNCTION regexp_match(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_match(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 328
-- Name: FUNCTION regexp_matches(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_matches(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 329
-- Name: FUNCTION regexp_matches(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_matches(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 330
-- Name: FUNCTION regexp_replace(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_replace(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 331
-- Name: FUNCTION regexp_replace(public.citext, public.citext, text, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_replace(public.citext, public.citext, text, text) FROM PUBLIC;


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 332
-- Name: FUNCTION regexp_split_to_array(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_split_to_array(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 333
-- Name: FUNCTION regexp_split_to_array(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_split_to_array(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 334
-- Name: FUNCTION regexp_split_to_table(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_split_to_table(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 335
-- Name: FUNCTION regexp_split_to_table(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.regexp_split_to_table(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 337
-- Name: FUNCTION replace(public.citext, public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.replace(public.citext, public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 338
-- Name: FUNCTION split_part(public.citext, public.citext, integer); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.split_part(public.citext, public.citext, integer) FROM PUBLIC;


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 336
-- Name: FUNCTION strpos(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.strpos(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 322
-- Name: FUNCTION texticlike(public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticlike(public.citext, text) FROM PUBLIC;


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 318
-- Name: FUNCTION texticlike(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticlike(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 323
-- Name: FUNCTION texticnlike(public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticnlike(public.citext, text) FROM PUBLIC;


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 319
-- Name: FUNCTION texticnlike(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticnlike(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 324
-- Name: FUNCTION texticregexeq(public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticregexeq(public.citext, text) FROM PUBLIC;


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 325
-- Name: FUNCTION texticregexne(public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticregexne(public.citext, text) FROM PUBLIC;


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 321
-- Name: FUNCTION texticregexne(public.citext, public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.texticregexne(public.citext, public.citext) FROM PUBLIC;


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 339
-- Name: FUNCTION translate(public.citext, public.citext, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.translate(public.citext, public.citext, text) FROM PUBLIC;


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 348
-- Name: FUNCTION authenticate(username text, password text); Type: ACL; Schema: users; Owner: postgres
--

GRANT ALL ON FUNCTION users.authenticate(username text, password text) TO user_anonymous;
GRANT ALL ON FUNCTION users.authenticate(username text, password text) TO user_auth;


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 247
-- Name: TABLE users; Type: ACL; Schema: users; Owner: postgres
--

GRANT ALL ON TABLE users.users TO user_auth;


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 349
-- Name: FUNCTION register_user(firstname text, surname text, username text, email text, password text, user_privelage_id integer); Type: ACL; Schema: users; Owner: postgres
--

GRANT ALL ON FUNCTION users.register_user(firstname text, surname text, username text, email text, password text, user_privelage_id integer) TO user_anonymous;
GRANT ALL ON FUNCTION users.register_user(firstname text, surname text, username text, email text, password text, user_privelage_id integer) TO user_auth;


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 861
-- Name: FUNCTION max(public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.max(public.citext) FROM PUBLIC;


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 860
-- Name: FUNCTION min(public.citext); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.min(public.citext) FROM PUBLIC;


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 245
-- Name: TABLE storages; Type: ACL; Schema: anbar; Owner: postgres
--

GRANT ALL ON TABLE anbar.storages TO user_auth;


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 249
-- Name: TABLE user_privelage; Type: ACL; Schema: users; Owner: postgres
--

GRANT ALL ON TABLE users.user_privelage TO user_auth;
GRANT ALL ON TABLE users.user_privelage TO user_anonymous;


--
-- TOC entry 3131 (class 3466 OID 102169)
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_ddl();


ALTER EVENT TRIGGER postgraphile_watch_ddl OWNER TO "postgres";

--
-- TOC entry 3132 (class 3466 OID 102170)
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_drop();


ALTER EVENT TRIGGER postgraphile_watch_drop OWNER TO "postgres";

-- Completed on 2021-03-30 09:20:38 +04

--
-- PostgreSQL database dump complete
--

