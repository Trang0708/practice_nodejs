//get all categories
const getCategories = async ({
    page,
    size,
    searchString
}) => {
    console.log('get all categories with paging')
}

const insertCategory = async ({
    name,
    description
}) => {
    console.log('new category was added')
}

export default {
    getCategories ,
    insertCategory
}