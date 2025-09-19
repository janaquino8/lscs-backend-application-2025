import mysql from 'mysql2';
import dotenv from 'dotenv';
import { isValidId, getValues } from './helper.js';

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
    if (!isValidId(id)) {
        return null;
    }

    const [rows] = await pool.query(`
        SELECT * FROM products 
        WHERE id = ?`, 
        [id]
    );
    
    return rows[0];
};

/**
 * @description Executes the query to create and insert a product into the database
 */
export async function createProduct(data) {
    const { keys, values, placeholders } = getValues(data);

    const [result] = await pool.query(
        `INSERT INTO products (${keys.join(', ')}) 
        VALUES (${placeholders})
        `, values
    );

    const prod = result.insertId;
    return getProductById(prod);
}

/**
 * @description Executes the query to update attributes of an existing product
 */
export async function updateProduct(id, data) {
    if (!isValidId(id)) {
        return null;
    }

    const { values, placeholders } = getValues(data, { forUpdate: true });
    values.push(id);

    const [result] = await pool.query(`
        UPDATE products
        SET ${placeholders}
        WHERE id = ?        
        `, values
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return getProductById(id);
};

/**
 * @description Executes the query to delete a product from the database
 */
export async function deleteProduct(id) {
    if (!isValidId(id)) {
        return null;
    }
    
    const [result] = await pool.query(`
        DELETE FROM products
        WHERE id = ?
        `, [id]
    );

    return result.affectedRows;
};