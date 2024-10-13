/*IMPORT LIBRARY AND MIDDELWARE*/
//import product repository
import { ProductRepository, CategoryRepository } from "../Repositories/index.js"
//import http status code
import httpStatusCode from "../Exceptions/HttpStatusCode.js"

//get all products
const getProducts = async (req,res) => {
    try {
        res.status(httpStatusCode.OK).json({
            message: 'Successfully get all products',
            data:
            [
                {
                    name: 'GTX 1660S',
                    price: '4000000 VND',
                    quantity: 1,
                    mfg: '28-08-2024',
                    category: 'GPU'
                },
                {
                    name: 'AMD 4650G',
                    price: '2500000 VND',
                    quantity: 9,
                    mfg: '28-08-2024',
                    category: 'CPU'
                },
                {
                    name: 'XTP 8GB RAM DDR4',
                    price: '800000 VND',
                    quantity: 8,
                    mfg: '28-08-2024',
                    category: 'RAM'
                }
            ]
        })
    } catch {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Unable to get products data'
        })
    }
}

//get product by id
const getProductByID = async (req,res) => {
}

//update product
const updateProduct = async (req,res) => {

}

//insert new product 
const insertProduct = async (req,res) => {
    const {name, price, quantity, mfg, categories} = req.body
    try {
        const product = await ProductRepository.insertProduct({ name, price, quantity, mfg, categories })
        res.status(httpStatusCode.OK).json({
            message: "New product was added",
            data: product
        })
    } catch (e) {
        res.status(httpStatusCode.NOT_FOUND).json({ 
            message: "Cannot insert new product",
            error: e.validationErrors
         })
    }
}

//delete product
const deleteProduct = async (req,res) => {

}

export default {
    getProducts,
    getProductByID,
    updateProduct,
    insertProduct,
    deleteProduct
}