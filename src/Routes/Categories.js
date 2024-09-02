/*IMPORT LIBRARY AND MIDDELWARE*/
import express from 'express'
//Import category controller
import { CategoryController } from '../Controllers/index.js'

const router = express.Router()

//get all categorys
router.get('/', CategoryController.getCategories)

//get category by id
router.get('/:id', CategoryController.getCategoryByID)

//update category
router.patch('/update',CategoryController.updateCategory)

//insert new category
router.post('/insert',CategoryController.insertCategory)

//delete category
router.delete('/delete',CategoryController.deleteCategory)

export default router