/*IMPORT LIBRARY AND MIDDELWARE*/
import express from 'express'
import {body, validationResult} from 'express-validator'
//Import user controller
import { UserController } from '../Controllers/index.js'

const router = express.Router()

//get all user
router.get('/', UserController.getUser)

//get user by id
router.get('/:id',UserController.getUserByID)

//login
router.post(
    '/login',
    //Password must has at least 5 characters 
    body('password').isLength({min:5}),
    UserController.login)

//sign up
router.post(
    '/signup',
    //Email validation
    body('email').isEmail(),
    //Password must has at least 5 characters 
    body('password').isLength({min:5}), 
    UserController.signup
    )

export default router