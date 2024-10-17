/*IMPORT LIBRARY AND MIDDELWARE*/
import express from 'express'
import {body, validationResult} from 'express-validator'
//Import product controller
import { ProductController } from '../Controllers/index.js'

const router = express.Router()

//get all products
router.get('/', ProductController.getProducts)

//get product by id
router.get('/:id', ProductController.getProductByID)

//update product
router.patch('/',ProductController.updateProduct)

//insert new product
router.post(
    '/insert',
    body('quantity').isFloat({min:1}),
    ProductController.insertProduct)

//delete product
router.delete('/',ProductController.deleteProduct)

export default router