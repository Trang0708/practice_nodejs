/*IMPORT LIBRARY AND MIDDELWARE*/
//import

//get all products
const getProducts = async (req,res) => {
    try {
        res.status(200).json({
            message: 'Successfully get all products',
            data:
            [
                {
                    name: 'GTX 1660S',
                    price: '4000000 VND',
                    mfg: '28-08-2024'
                },
                {
                    name: 'AMD 4650G',
                    price: '2500000 VND',
                    mfg: '28-08-2024'
                },
                {
                    name: 'XTP 8GB RAM DDR4',
                    price: '800000 VND',
                    mfg: '28-08-2024'
                }
            ]
        })
    } catch {
        res.status(500).json({
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