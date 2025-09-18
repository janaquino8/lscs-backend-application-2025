import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // configures server information

// Collection of connections to the database.
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

/**
 * @description Executes the query to get all products
 */
export async function getProducts() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
};

/**
 * @description Executes the query to get a product by its id
 */
export async function getProductById(id) {
    const [rows] = await pool.query(`
        SELECT * FROM products 
        WHERE id = ?`, 
        [id]);
    return rows[0];
};

/**
 * @description Executes the query to create and insert a product into the database
 */
export async function createProduct(name, price, description, type) {
    const [result] = await pool.query(`
        INSERT INTO products (name, price, description, type)
        VALUES (?, ?, ?, ?)
        `, [name, price, description, type]);
    return getProductById(result.insertId);
}

/**
 * @description Executes the query to update attributes of an existing product
 */
export async function updateProduct(id, name, price, description, type) {
    const [result] = await pool.query(`
        UPDATE products
        SET ?
        WHERE id = ?        
        `, [name, price, description, type, id]);
    return getProductById(result.insertId);
};

/**
 * @description Executes the query to delete a product from the database
 */
export async function deleteProduct(id) {
    const [result] = await pool.query(`
        DELETE FROM products
        WHERE id = ?
        `, [id]);
    return result;
}