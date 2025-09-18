import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct  } from './connectdb.js';
import { create } from 'express-handlebars';

const app = express();
const port = process.env.PORT || 3000;

// declaration of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 *  @description POST request to create a new product.
 */
app.post('/products', async (req, res) => {
    try {
        const { name, price, description, type } = req.body;
        const prod = await createProduct(name, price, description, type);

        res.status(201).send(prod);
    } catch(error) {

    }
});

/**
 *  @description GET request to retrieve all products.
 */
app.get('/products', async (req, res) => {
    try {
        const prod = await getProducts();

        res.status(200).send(prod);
    } catch(error) {

    }
});

/**
 *  @description GET request to retrieve a single product by its ID.
 */
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const prod = await getProductById(id);

    if (prod) {
        res.status(200).send(prod);
    } else {
        res.status(404).send("Product was not found");
    }
});

/**
 *  @description PUT request to update an existing product's details by its ID.
 */
app.put('/products/:id', async (req, res) => {
    try { // UPDATE
        const id = req.params.id;
        await Task.findByIdAndUpdate(id, req.body);
        const task = await Task.findById(id); 
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

/**
 *  @description DELETE request to delete a product by its ID.
 */
app.delete('products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const prod = await deleteProduct(id);

        res.status(200).send({ message: "Product has been deleted successfully" });
    } catch (error) {
        
    }
});

/**
 *  @description Sends an error message for 500 Internal Server Error
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("An internal server error occurred");
});

/**
 *  @description Starts the server.
 */
app.listen(port, () => {
    console.log(`Products API is live on http://localhost:${port}`);
});