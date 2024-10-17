/*IMPORT LIBRARY AND MIDDELWARE*/
import {body, validationResult} from 'express-validator'
//import product repository
import { ProductRepository} from "../Repositories/index.js"
//import http status code
import httpStatusCode from "../Exceptions/HttpStatusCode.js"
//import global constants
import Max_RECORDS from "../Global/Constants.js"

//get all products
const getProducts = async (req,res) => {
    let {page = 1, size, searchString= ""} = req.query
    size = size >= Max_RECORDS ? Max_RECORDS : size
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
    const {id, name, price, quantity, mfg, categories} = req.body
    try {
        const product = await ProductRepository.updateProduct({id, name, price, quantity, mfg, categories})
        res.status(httpStatusCode.OK).json({
            message: "Product was udpated",
            data: product
        })
    } catch (e) {
        let errorMessage = e.toString()
        if (Object.keys(e.validationErrors).length !== 0){
            errorMessage = e.validationErrors
        }
        res.status(httpStatusCode.NOT_FOUND).json({ 
            message: "Cannot update product",
            error: errorMessage
         })
    }
}

//insert new product 
const insertProduct = async (req,res) => {
    const errors = validationResult(req)
    const {name, price, quantity, mfg, categories} = req.body
    if (!errors.isEmpty()){
        return res.status(httpStatusCode.NOT_FOUND).json({errors: errors.array()})
    }
    try {
        const product = await ProductRepository.insertProduct({ name, price, quantity, mfg, categories })
        res.status(httpStatusCode.OK).json({
            message: "New product was added",
            data: product
        })
    } catch (e) {
        let errorMessage = e.toString()
        if (Object.keys(e.validationErrors).length !== 0){
            errorMessage = e.validationErrors
        }
        res.status(httpStatusCode.NOT_FOUND).json({ 
            message: "Cannot update product",
            error: errorMessage
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