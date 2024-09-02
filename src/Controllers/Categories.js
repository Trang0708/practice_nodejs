/*IMPORT LIBRARY AND MIDDELWARE*/
//import category repository
import { CategoryRepository } from "../Repositories/index.js"
//import http status code
import httpStatusCode from "../Exceptions/HttpStatusCode.js"

//get all categories
const getCategories = async (req,res) => {
    try {
        res.status(httpStatusCode.OK).json({
            message: 'Successfully get all categories',
            data:
            [{
                "name": "RAM",
                "description": "random access memory"
              },
              {
                "name": "CPU",
                "description": "central proccessing unit"
              },
              {
                "name": "PSU",
                "description": "power supply unit"
              },
              {
                "name": "GPU",
                "description": "graphics card"
              }]
        })
    } catch {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Unable to get categories data'
        })
    }
}

//get Category by id
const getCategoryByID = async (req,res) => {

}

//update Category
const updateCategory = async (req,res) => {

}

//insert new Category 
const insertCategory = async (req,res) => {

}

//delete Category
const deleteCategory = async (req,res) => {

}

export default {
    getCategories,
    getCategoryByID,
    updateCategory,
    insertCategory,
    deleteCategory
}