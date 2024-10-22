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
    debugger
    page = parseInt(page)
    size = parseInt(size)
    const searchNumber = Number(searchString);
    let filteredProducts = await Product.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' }
                    },
                    // If the search string can be converted to a number, match against the price
                    ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }]),
                    {
                        categories: {
                          $elemMatch: {
                            name: { $regex: `.*${searchString}.*`, $options: 'i' }
                          }
                        }
                    }
                ]
            }
        },
        {
            $skip: (page-1)*size
        },
        {
            $limit: size
        }
    ])
    return filteredProducts
}

const getProductDetailById = async (productID) => {
    const product = await Product.findById(productID)
    if (!product){
        throw new Exception(Exception.UNEXISTED_PRODUCT + " with id " + productID )
    }
    return product ?? {}
}

const insertProduct = async ({
    name,
    price,
    quantity,
    mfg,
    categories
}) => {
    const existedCategories = await findingCategories(categories)
    //check if any category is unexisted
    if (existedCategories.length !== categories.length) {
        throw new Exception(Exception.UNEXISTED_CATEGORIES)
    }
    //get an array of id from categories
    const categoryIDs = existedCategories.map(category => category._id)

    //update the product if the product is already exist
    const existedProduct = await Product.findOne({ name, mfg }).exec()
    if (!!existedProduct) {
        existedProduct.name = name ?? existedProduct.name
        existedProduct.price = price ?? existedProduct.price
        existedProduct.quantity = (quantity ?? 0) + existedProduct.quantity
        existedProduct.mfg = mfg ?? existedProduct.mfg
        existedProduct.categories = existedCategories ?? existedProduct.categories
        await existedProduct.save()
        console.log('existed product was updated')
        return existedProduct.populate('categories')
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
        //return the product with all information of categories (including id, des and name)
        return product.populate('categories')
    } catch (e) {
        //check model validation
        if (!!e.errors) {
            throw new Exception('Input error', e.errors)
        }
    }
}

const updateProduct = async ({
    id,
    name,
    price,
    quantity,
    mfg,
    categories
}) => {
    const existedCategories = await findingCategories(categories)
    if (existedCategories.length !== categories.length) {
        throw new Exception(Exception.UNEXISTED_CATEGORIES)
    }
    try {
        const product = await Product.findById(id)
        if (!product){
            throw new Exception(Exception.UNEXISTED_PRODUCT + " with id " + id )
        }
        product.name = name ?? product.name
        product.price = price ?? product.price
        product.quantity = quantity ?? product.quantity
        product.mfg = mfg ?? product.mfg
        product.categories = existedCategories ?? product.categories
        await product.save()
        console.log('product was updated')
        return product.populate('categories')
    } catch (e) {
        //check model validation
        if (!!e.errors) {
            throw new Exception('Input error', e.errors)
        }
    }
}
// functions
async function findingCategories(categories) {
    //uppercase the categories name to avoid typo
    const categoriesUpperCase = categories.map(category => category.toString().toUpperCase())
    //query all the category with name
    const existedCategories = await Category.aggregate([
        {
            $match: {
                name: { $in: categoriesUpperCase }
            }
        }
    ])
    return existedCategories
}
export default {
    getProducts,
    getProductDetailById,
    insertProduct,
    updateProduct
}