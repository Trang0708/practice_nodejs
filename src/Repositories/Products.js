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
    mfg
}) => {
    console.log('new product was added')
}

export default {
    getProducts,
    insertProduct
}