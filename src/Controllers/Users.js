/*IMPORT LIBRARY AND MIDDELWARE*/
import {validationResult} from 'express-validator'
//import http status code
import httpStatusCode from '../Exceptions/HttpStatusCode.js'
//import repository
import { UserRepository } from '../Repositories/index.js'

//get all users
const getUser = async (req,res) => {
    try {
        res.status(httpStatusCode.OK).json({
            message: 'Successfully get all users',
            data:
            [
                {
                    name: 'user1',
                    email: 'user1@email.com',
                    password: 'user1abcd',
                    role: 'admin'
                },
                {
                    name: 'user2',
                    email: 'user2@email.com',
                    password: 'user2abcd',
                    role: 'general'
                },
                {
                    name: 'user3',
                    email: 'user3@email.com',
                    password: 'user3abcd',
                    role: 'general'
                }
            ]
        })
    } catch (e){
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Unable to get user data'
        })
    }
}

//get user by id
const getUserByID = async (req,res) => {
    res.send ('Get user by id ' + req.params.id)
}

//login
const login = async (req,res) => {
    //validate body request
    const errors = validationResult(req)
    //distructuring body request
    const {email,password} = req.body
    if (errors.isEmpty()){
        await UserRepository.login({email,password})
        res.status(httpStatusCode.OK).json({
            message: 'User ' + req.body.username + ' login successfully',
            data: 'detail user here'
        })
    } else {
        return res.status(httpStatusCode.NOT_FOUND).json({errors: errors.array()})
    }
}

//signup
const signup = async (req,res) => {
    //validate body request
    const errors = validationResult(req)
    //distructuring body request
    const {
        username,
        email,
        password,
        phoneNumber,
        role
    } = req.body 
    if (errors.isEmpty()){
        await UserRepository.signup({
            username,
            email,
            password,
            phoneNumber,
            role
        })
        res.status(httpStatusCode.OK).json({
            message: 'New user was created successfully'
        })
    } else {
        return res.status(httpStatusCode.NOT_FOUND).json({errors: errors.array()})
    }
}

export default {
    getUser,
    getUserByID,
    login,
    signup
}