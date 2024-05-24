import express from 'express'
import { addProduct, getAllProducts, getProductByID, deleteProduct, updateProduct } from '../controllers/index.js';
import { jwtTokenVerification } from '../middlewares/authMiddleware.js';
export const ProductRouter = express.Router();



ProductRouter.get('/', jwtTokenVerification, getAllProducts)

ProductRouter.get('/:id', jwtTokenVerification, getProductByID)

ProductRouter.delete('/:id', jwtTokenVerification, deleteProduct)

ProductRouter.post('/', jwtTokenVerification, addProduct)

ProductRouter.put('/:id', jwtTokenVerification, updateProduct)