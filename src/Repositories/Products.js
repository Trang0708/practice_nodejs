/*IMPORT LIBRARY AND MIDDELWARE*/
//import models
import { Category, Product } from '../Models/index.js'
//import exception
import Exception from '../Exceptions/exceptions.js'

//get all products
const getProducts = async ({
    page,
    size,
    searchString
}) => {
    console.log('get all products with paging')
}

const insertProduct = async ({
    name,
    price,
    quantity,
    mfg,
    categories
}) => {
    //uppercase all the category name to avoid typo request from client
    const categoriesString = categories.map(category => category.toString().toUpperCase() )
    //query all the category with name
    const existedCategories = await Category.find().where('name').in(categoriesString).exec()
    //check if any category is unexisted
    if (existedCategories.length !== categories.length) {
        throw new Exception(Exception.UNEXISTED_CATEGORY)
    }
    //get an array of id from categories
    const categoryIDs = existedCategories.map(category => category._id)

    //update the product if the product is already exist
    const existedProduct = await Product.findOne({name, mfg}).exec()
    if (!!existedProduct) {
        try {
            const updateProduct = await Product.findOneAndUpdate(
                //filter
                {
                    name,
                    mfg
                },
                //updating product 
                {
                    price,
                    //adding new product with same name and manufacture date will increase the quantity
                    $inc: { quantity },
                    categories: categoryIDs
                },
                {new: true}
            )
            return {
                ...updateProduct.toObject(),
                categories
            } 
        } catch (e) {
            //check model validation
            if (!!e.errors){
                throw new Exception('Input error', e.errors)
            }
        }
    }
    try {
        const product = await Product.create({
            name,
            price,
            quantity,
            mfg,
            categories: categoryIDs
        })
        console.log('new product was added')
        return {
            ...product.toObject(),
            categories
        } 
    } catch (e) {
        //check model validation
        if (!!e.errors){
            throw new Exception('Input error', e.errors)
        }
    }
}

export default {
    getProducts,
    insertProduct
}