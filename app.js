import express from 'express';
import router from './routes/routes.js'

const app = express();
const port = process.env.PORT || 3000;

// Declaration of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Designation of routes and endpoints
app.use('/products', router);

// Sends an error message for 500 Internal Server Error.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An internal server error occured." });
});

// Starts the server.
app.listen(port, () => {
    console.log(`Products API is live on http://localhost:${port}`);
});