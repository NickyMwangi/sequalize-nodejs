import express from 'express'
import { addProduct, getAllProducts, getProductByID, deleteProduct, updateProduct } from '../controllers/index.js';
export const ProductRouter = express.Router();


ProductRouter.get('/', getAllProducts)

ProductRouter.get('/:id', getProductByID)

ProductRouter.delete('/:id', deleteProduct)

ProductRouter.post('/', addProduct)

ProductRouter.put('/:id', updateProduct)