import express from 'express';
import { getProdutos } from '../controllers/productController.js';
const router = express.Router();

router.get('/', getProdutos);
export default router;
