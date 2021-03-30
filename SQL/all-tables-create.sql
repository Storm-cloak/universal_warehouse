-- tables
-- Table: app_settings
CREATE TABLE settings.app_settings (
    id int generated always as identity ,
    default_currency int  NOT NULL,
    default_language int  NOT NULL,
    netto_brutto bit(2)  NOT NULL,
    CONSTRAINT app_settings_pk PRIMARY KEY (id)
);

-- Table: clients
CREATE TABLE client.clients (
    id int generated always as identity,
    firstname text  NULL,
    lastname text  NULL,
    is_active bit(1)  NOT NULL,
    phonenumber text  NULL,
    p_address text  NULL,
    CONSTRAINT clients_pk PRIMARY KEY (id)
);

-- Table: clients_shopping
CREATE TABLE client.clients_shopping (
    id int generated always as identity,
    client_id int  NOT NULL,
    session_id int  NOT NULL,
    dept float  NOT NULL,
    CONSTRAINT clients_shopping_pk PRIMARY KEY (id,dept)
);

-- Table: clusters
CREATE TABLE cluster.clusters (
    id int generated always as identity,
    cluster_id int  NOT NULL,
    cluster_order int  NOT NULL,
    capacity int  NOT NULL,
    clusters_name_id int  NOT NULL,
    CONSTRAINT clusters_pk PRIMARY KEY (id)
);

-- Table: clusters_title
CREATE TABLE cluster.clusters_title (
    id int generated always as identity,
    title jsonb  NOT NULL,
    package_weight float  NULL,
    CONSTRAINT clusters_title_pk PRIMARY KEY (id)
);

-- Table: currency_exchange_rate
CREATE TABLE currency.currency_exchange_rate (
    id int generated always as identity,
    title_id int  NOT NULL,
    value float  NOT NULL,
    time timestamp  NOT NULL,
    CONSTRAINT currency_exchange_rate_pk PRIMARY KEY (id)
);

-- Table: currency_title
CREATE TABLE currency.currency_title (
    id int generated always as identity,
    short_title text  NOT NULL,
    full_title jsonb  NOT NULL,
    CONSTRAINT currency_title_pk PRIMARY KEY (id)
);

-- Table: inventory
CREATE TABLE inventory.inventory (
    id int generated always as identity,
    inventory_id int  NOT NULL,
    product_id int  NOT NULL,
    real_quantity float  NOT NULL,
    storage_quantity float  NOT NULL,
    CONSTRAINT inventory_pk PRIMARY KEY (id)
);

-- Table: inventory_desc
CREATE TABLE inventory.inventory_desc (
    id int generated always as identity,
    start_date timestamp  NOT NULL,
    end_date timestamp  NULL,
    comment text  NULL,
    CONSTRAINT inventory_desc_pk PRIMARY KEY (id)
);

-- Table: languages
CREATE TABLE settings.languages (
    id int generated always as identity,
    short_title text  NOT NULL,
    full_title text  NOT NULL,
    CONSTRAINT languages_pk PRIMARY KEY (id)
);

-- Table: main
CREATE TABLE anbar.main (
    id int generated always as identity,
    session_id int  NOT NULL,
    product_id int  NOT NULL,
    quantity float  NOT NULL,
    DELETE_THIS_result smallint  NOT NULL,
    price float  NOT NULL,
    netto_price float  NULL,
    prod_date date  NULL,
    exp_date date  NULL,
    product_cell text  NULL,
    document_id text  NOT NULL,
    document_parent_id text  NULL,
    currency_id int  NOT NULL,
    margin float  NULL,
    clusters_id int  NOT NULL,
    netto_weight float  NULL,
    brutto_weight float  NULL,
    inventory_array jsonb  NOT NULL,
    CONSTRAINT main_pk PRIMARY KEY (id)
);

-- Table: product_sellers
CREATE TABLE sellers.product_sellers (
    id int generated always as identity,
    seller_title text  NOT NULL,
    firstname text  NOT NULL,
    surname text  NOT NULL,
    is_active bit(1)  NOT NULL DEFAULT '1',
    p_address text  NOT NULL,
    phonenumber text  NOT NULL,
    CONSTRAINT product_sellers_pk PRIMARY KEY (id)
);

-- Table: sessions
CREATE TABLE anbar.sessions (
    id int generated always as identity,
    parent_id int  NOT NULL,
    is_done bit(1)  NOT NULL,
    begin_date timestamp  NOT NULL,
    invoice_num text  NULL,
    product_seller_id int  NULL,
    storage_id int  NOT NULL,
    electron_receipt text  NULL,
    type smallint  NOT NULL,
    CONSTRAINT sessions_pk PRIMARY KEY (id)
);

-- Table: storages
CREATE TABLE anbar.storages (
    id int generated always as identity,
    storage_name jsonb  NOT NULL,
    storage_type int  NOT NULL,
    responsible_person_id int  NOT NULL,
    CONSTRAINT storages_pk PRIMARY KEY (id)
);


-- Table: users
CREATE TABLE users.users (
    id int generated always as identity,
    username text UNIQUE NOT NULL,
    firstname text  NOT NULL,
    surname text  NOT NULL,
	user_privelage_id int NOT NULL,
	created_at timestamptz DEFAULT now(),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- Table: user_privelage
CREATE TABLE users.user_privelage (
    id int generated always as identity,
    privelage_name text  NOT NULL,
    modules_access jsonb  NOT NULL,
    CONSTRAINT user_privelage_pk PRIMARY KEY (id)
);

-- Table: users_account
CREATE TABLE private_users.users_account (
    id int generated always as identity,
    password_hash text  NOT NULL,
    email users.email  UNIQUE NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT users_account_pk PRIMARY KEY (id)
);


-- Table: warehouse
CREATE TABLE anbar.warehouse (
    id int generated always as identity,
    title jsonb  NOT NULL,
    title2 jsonb  NOT NULL,
    parent_id int  NOT NULL,
    cluster_id int  NOT NULL,
    cluster_order_default_id int  NOT NULL,
    barcode text  NOT NULL,
    min_quantity float  NULL,
    optimal_quantity float  NULL,
    exp_date_warning int  NULL,
    image_link text  NULL,
    is_weight bit(1)  NOT NULL DEFAULT '0',
    is_inventory bit(1)  NOT NULL DEFAULT '0',
    storage_id int  NOT NULL,
    measure_by bit(2)  NULL,
    margin_default float  NULL,
    CONSTRAINT warehouse_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: app_settings_currency_title (table: app_settings)
ALTER TABLE settings.app_settings ADD CONSTRAINT app_settings_currency_title
    FOREIGN KEY (default_currency)
    REFERENCES currency.currency_title (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: app_settings_languages (table: app_settings)
ALTER TABLE settings.app_settings ADD CONSTRAINT app_settings_languages
    FOREIGN KEY (default_language)
    REFERENCES settings.languages (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: clients_shopping_clients (table: clients_shopping)
ALTER TABLE client.clients_shopping ADD CONSTRAINT clients_shopping_clients
    FOREIGN KEY (client_id)
    REFERENCES client.clients (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: clients_shopping_sessions (table: clients_shopping)
ALTER TABLE client.clients_shopping ADD CONSTRAINT clients_shopping_sessions
    FOREIGN KEY (session_id)
    REFERENCES anbar.sessions (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: clusters_clusters_name (table: clusters)
ALTER TABLE cluster.clusters ADD CONSTRAINT clusters_clusters_name
    FOREIGN KEY (clusters_name_id)
    REFERENCES cluster.clusters_title (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: currency_exchange_rate_currency_title (table: currency_exchange_rate)
ALTER TABLE currency.currency_exchange_rate ADD CONSTRAINT currency_exchange_rate_currency_title
    FOREIGN KEY (title_id)
    REFERENCES currency.currency_title (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: inventory_invetory_desc (table: inventory)
ALTER TABLE inventory.inventory ADD CONSTRAINT inventory_invetory_desc
    FOREIGN KEY (inventory_id)
    REFERENCES inventory.inventory_desc (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: main_currency_title (table: main)
ALTER TABLE anbar.main ADD CONSTRAINT main_currency_title
    FOREIGN KEY (currency_id)
    REFERENCES currency.currency_title (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: main_sessions (table: main)
ALTER TABLE anbar.main ADD CONSTRAINT main_sessions
    FOREIGN KEY (session_id)
    REFERENCES anbar.sessions (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: main_warehouse (table: main)
ALTER TABLE anbar.main ADD CONSTRAINT main_warehouse
    FOREIGN KEY (product_id)
    REFERENCES anbar.warehouse (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: sessions_product_sellers (table: sessions)
ALTER TABLE anbar.sessions ADD CONSTRAINT sessions_product_sellers
    FOREIGN KEY (product_seller_id)
    REFERENCES sellers.product_sellers (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: sessions_storages (table: sessions)
ALTER TABLE anbar.sessions ADD CONSTRAINT sessions_storages
    FOREIGN KEY (storage_id)
    REFERENCES anbar.storages (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: storages_users (table: storages)
ALTER TABLE anbar.storages ADD CONSTRAINT storages_users
    FOREIGN KEY (responsible_person_id)
    REFERENCES users.users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: users_account_users (table: users_account)
ALTER TABLE private_users.users_account ADD CONSTRAINT users_account_users
    FOREIGN KEY (user_id)
    REFERENCES users.users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: users_user_privelage (table: users)
ALTER TABLE users.users ADD CONSTRAINT users_user_privelage
    FOREIGN KEY (user_privelage_id)
    REFERENCES users.user_privelage (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: warehouse_clusters (table: warehouse)
ALTER TABLE anbar.warehouse ADD CONSTRAINT warehouse_clusters
    FOREIGN KEY (cluster_id)
    REFERENCES cluster.clusters (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: warehouse_storages (table: warehouse)
ALTER TABLE anbar.warehouse ADD CONSTRAINT warehouse_storages
    FOREIGN KEY (storage_id)
    REFERENCES anbar.storages (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

