CREATE TABLE brands (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE devices (
  id BIGSERIAL PRIMARY KEY,
  brand_id BIGINT NOT NULL REFERENCES brands(id),
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE
);

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES categories(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  description TEXT,
  price_mga INTEGER NOT NULL CHECK (price_mga >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  sku VARCHAR(100) UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_devices (
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  device_id BIGINT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, device_id)
);

CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(40),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  reference VARCHAR(40) NOT NULL UNIQUE,
  customer_id BIGINT REFERENCES customers(id),
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(30) NOT NULL,
  payment_status VARCHAR(30) NOT NULL DEFAULT 'pending',
  subtotal_mga INTEGER NOT NULL,
  delivery_mga INTEGER NOT NULL DEFAULT 0,
  total_mga INTEGER NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(120) NOT NULL,
  district VARCHAR(160),
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  product_name VARCHAR(200) NOT NULL,
  unit_price_mga INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  provider VARCHAR(40) NOT NULL,
  provider_reference VARCHAR(255),
  amount_mga INTEGER NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

