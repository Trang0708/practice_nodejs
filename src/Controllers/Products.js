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
    debugger
    let {page = 1, size = Max_RECORDS, searchString= ""} = req.query
    size = size >= Max_RECORDS ? Max_RECORDS : size
    try {
        const filteredProducts = await ProductRepository.getProducts({size, page, searchString})
        res.status(httpStatusCode.OK).json({
            message: 'Successfully get all products',
            page: parseInt(page),
            size: filteredProducts.length,
            searchString,
            data: filteredProducts
        })
    } catch (e){
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Unable to get products data',
            error: e.message
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
        let errorMessage = e.message
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
        let errorMessage = e.message
        if (Object.keys(e.validationErrors).length !== 0){
            errorMessage = e.validationErrors
        }
        res.status(httpStatusCode.NOT_FOUND).json({ 
            message: "Cannot add product",
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