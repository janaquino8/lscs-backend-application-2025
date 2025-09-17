DROP DATABASE IF EXISTS products_db;

CREATE DATABASE products_db;
USE products_db;

CREATE TABLE products {
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL NOT NULL CHECK(price >= 0),
    desc VARCHAR(250),
    type ENUM('luxury', 'fashion', 'electronics', 'property', 'vehicle', 'collectible', 'other')
};
