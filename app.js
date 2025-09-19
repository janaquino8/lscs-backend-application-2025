import express from 'express';
import { createProductSchema, updateProductSchema } from './schema.js'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct  } from './connectdb.js';

const app = express();
const port = process.env.PORT || 3000;

// Declaration of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 *  @description POST request to create a new product.
 */
app.post('/products', async (req, res) => {
    const { error } = createProductSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const prod = await createProduct(req.body);
    res.status(201).json(prod);    
});

/**
 *  @description GET request to retrieve all products.
 */
app.get('/products', async (req, res) => {
    const prod = await getProducts();
    res.status(200).json(prod);
});

/**
 *  @description GET request to retrieve a single product by its ID.
 */
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const prod = await getProductById(id);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });   
    }
    
    res.status(200).json(prod);
});

/**
 *  @description PUT request to update an existing product's details by its ID.
 */
app.put('/products/:id', async (req, res) => { // UPDATE
    const id = req.params.id;
    const { error } = updateProductSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body is empty." });
    }

    const prod = await updateProduct(id, req.body);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });
    }
    
    res.status(200).json(prod);
});

/**
 *  @description DELETE request to delete a product by its ID.
 */
app.delete('/products/:id', async (req, res) => {   
    const id = req.params.id;
    
    const prod = await deleteProduct(id);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });   
    }

    res.status(200).json({ message: `Product with id ${id} was successfully deleted.` });
});

/**
 *  @description Sends an error message for 500 Internal Server Error
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An internal server error occured." });
});

/**
 *  @description Starts the server.
 */
app.listen(port, () => {
    console.log(`Products API is live on http://localhost:${port}`);
});
