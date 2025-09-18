import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// declaration of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @description POST request to create a new product.
 */
app.post('/products', (req, res) => {

});

/**
 * @description GET request to retrieve all products.
 */
app.get('/products', (req, res) => {

});

/**
 * @description GET request to retrieve a single product by its ID.
 */
app.get('/products/:id', (req, res) => {

});

/**
 * @description PUT request to update an existing product's details by its ID.
 */
app.put('/products/:id', (req, res) => {

});

/**
 * @description DELETE request to delete a product by its ID.
 */
app.delete('products/:id', (req, res) => {

});

/**
 * @description Starts the server.
 */
app.listen(port, () => {
  console.log(`Products API is live on http://localhost:${port}`);
});