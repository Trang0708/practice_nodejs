/*IMPORT LIBRARY AND MIDDELWARE*/
import {body, validationResult} from 'express-validator'
//import user model
import {User} from '../Models/index.js'
//import bcrypt to encrypt password for user
import bcrypt from 'bcrypt'
//imort from helpers
import { print, OutputType } from "../Helpers/print.js"
//import exception
import Exception from '../Exceptions/exceptions.js'
//enviroment config
import * as dotenv from 'dotenv'
dotenv.config()

//login
const login = async ({email, password}) => {
    try {
        const existedUser = await  User.findOne({email}).exec()
        const hashedPwd = await bcrypt.hash(password, process.env.BCRYPT_KEY)
        //check if password of user
        const isPwdMatched = bcrypt.compare(hashedPwd, existedUser.password)

        if (isPwdMatched){
            print('User login successfully', OutputType.SUCCESS)
        }
    } catch (e) {
        
    }
}

//sign up
const signup= async ({
    username,
    email,
    password,
    phoneNumber,
    role
}) => {
    try {
        const existedUser = await User.findOne({email}).exec()
        if (!!existedUser) {
            throw new Exception(Exception.USER_EXISTED)
        }
        const hashedPwd = await bcrypt.hash(password, parseInt("practice make perfect"))
        //insert new user to db
        //if key and value are the same, no need to use ':' between them
        const newUser = await User.create({
            username,
            email,
            password: hashedPwd,
            phoneNumber,
            role
        })
        print ('New user was added', OutputType.SUCCESS)
        print('Sign up new user with: ' + '\n' +
                'User name: ' + username + '\n' +
                'Email: ' + email + '\n' +
                'Password: ' + hashedPwd + '\n' +
                'Phone number: ' + phoneNumber + '\n' +
                'Role: ' + role + '\n', OutputType.INFORMATION)
        return newUser
    } catch (e) {
        debugger
        //check model validation
        throw new Exception(Exception.UNABLE_TO_SIGN_UP)
    }
}

export default {
    login,
    signup
}