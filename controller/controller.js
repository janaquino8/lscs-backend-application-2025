import Schema from '../schema/schema.js'
import ConnectDB from '../connectdb.js';

/**
 *  @description POST request to create a new product.
 *  @route POST /products
 */
async function httpPostProduct(req, res) {
    const { error, value} = Schema.createProductSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } else if (Object.keys(req.query).length > 0) {
        return res.status(400).json({ error: "Invalid POST endpoint." });
    }

    const prod = await ConnectDB.createProduct(value);

    res.status(201).json(prod);    
};

/**
 *  @description GET request to retrieve all products.
 *  @route GET /products
 */
async function httpGetProductAll(req, res) {
    const { page = 0, limit = 0 } = req.query;
    const offset = (page - 1) * limit;

    if (offset < 0 || page < 0 || limit < 0 || !Number.isInteger(offset)) {
        return res.status(400).json({ error: "Invalid query parameters." });
    }

    const prod = await ConnectDB.getProducts(limit, offset);

    if (Object.keys(prod).length === 0) {
        return res.status(400).json({ error: "No results found." });
    }

    res.status(200).json(prod);
};

/**
 *  @description GET request to retrieve a single product by its ID.
 *  @route GET /products/:id
 */
async function httpGetProductById(req, res) {
    const id = req.params.id;

    const prod = await ConnectDB.getProductById(id);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });   
    }
    
    res.status(200).json(prod);
};

/**
 *  @description PUT request to update an existing product's details by its ID.
 *  @route PUT /products/:id
 */
async function httpPutProduct(req, res) { // UPDATE
    const id = req.params.id;

    const { error } = Schema.updateProductSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body is empty." });
    }

    const prod = await ConnectDB.updateProduct(id, req.body);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });
    }
    
    res.status(200).json(prod);
};

/**
 *  @description DELETE request to delete a product by its ID.
 *  @route DELETE /products/:id
 */
async function httpDeleteProduct(req, res) {   
    const id = req.params.id;
    
    const prod = await ConnectDB.deleteProduct(id);

    if (!prod) {
        return res.status(404).json({ error: "Product was not found." });   
    }

    res.status(200).json({ message: `Product with id ${id} was successfully deleted.` });
};

const Controller = { httpPostProduct, httpGetProductAll, httpGetProductById, httpPutProduct, httpDeleteProduct };
export default Controller;