CREATE DATABASE "unicad";

-- Habilitando uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS deliveries (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  client_name VARCHAR NOT NULL,
  delivery_date TIMESTAMP,
  starting_point VARCHAR,
  destination_point VARCHAR
);
