DROP DATABASE IF EXISTS products_db;

CREATE DATABASE IF NOT EXISTS products_db;
USE products_db;

CREATE TABLE IF NOT EXISTS products (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK(price >= 0),
    description VARCHAR(250) NOT NULL,
    type ENUM('luxury', 'fashion', 'electronics', 'vehicle', 'collectible', 'other') DEFAULT('other'),
    brand VARCHAR(50) DEFAULT('unknown'),
    origin_loc VARCHAR(75) DEFAULT('unknown'),
    stock_quantity INTEGER CHECK(stock_quantity >= 0) DEFAULT(0)    
);

SELECT * FROM products;