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
    category
}) => {
    const existedCategory = await Category.findOne({ name: category.toString().toUpperCase() }).exec()
    if (!existedCategory) {
        throw new Exception(Exception.UNEXISTED_CATEGORY)
    }
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
                    category: existedCategory._id
                },
                {new: true}
            )
            return updateProduct
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
            category: existedCategory._id
        })
        console.log('new product was added')
        return product 
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