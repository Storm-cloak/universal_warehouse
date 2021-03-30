--ANBAR SCHEMA--
DROP TABLE anbar.main CASCADE;
DROP TABLE anbar.sessions CASCADE;
DROP TABLE anbar.storages CASCADE;
DROP TABLE anbar.warehouse CASCADE;

--CLIENT SCHEMA--
DROP TABLE client.clients CASCADE;
DROP TABLE client.clients_shopping CASCADE;

--CLUSTER SCHEMA--
DROP TABLE cluster.clusters CASCADE;
DROP TABLE cluster.clusters_title CASCADE;


--CURRENCY SCHEMA--
DROP TABLE currency.currency_exchange_rate CASCADE;
DROP TABLE currency.currency_title CASCADE;


--INVENTORY SCHEMA--
DROP TABLE inventory.inventory CASCADE;
DROP TABLE inventory.inventory_desc CASCADE;

--PRIVATE_USERS SCHEMA--
DROP TABLE private_users.users_account CASCADE;

--SELLERS SCHEMA--
DROP TABLE sellers.product_sellers CASCADE;


--SETTINGS SCHEMA--
DROP TABLE settings.app_settings CASCADE;
DROP TABLE settings.languages CASCADE;

--USERS SCHEMA--
DROP TABLE users.user_privelage CASCADE;
DROP TABLE users.users CASCADE;