import express from 'express';
import Controller from '../controller/controller.js'

const router = express.Router();

// Routing to product methods.
router.route('/').post(Controller.httpPostProduct)
                 .get(Controller.httpGetProductAll);

router.route('/:id').get(Controller.httpGetProductById)
                    .put(Controller.httpPutProduct)
                    .delete(Controller.httpDeleteProduct);

export default router;