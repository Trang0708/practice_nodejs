/*IMPORT LIBRARY AND MIDDELWARE*/
//import user model
import {User} from '../Models/index.js'
//import bcrypt to encrypt/decrypt user's password
import bcrypt from 'bcrypt'
//import Java Web Token library
import jwt from 'jsonwebtoken'
//imort from helpers
import { print, OutputType } from "../Helpers/print.js"
//import exception
import Exception from '../Exceptions/exceptions.js'
//enviroment config
import * as dotenv from 'dotenv'
dotenv.config()

//login
const login = async ({email, password}) => {
    const existedUser = await User.findOne({ email }).exec()
    //check if password of user is matched
    if (existedUser) {
        let isPwdMatched = bcrypt.compare(password, existedUser.password)
        if (isPwdMatched) {
            //create Java Web Token
            let JWTtoken = jwt.sign(
                {
                    data: existedUser
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "7 days"
                }
            )
            // clone existedUser and add more properties (not show password and add token property)
            return {
                ...existedUser.toObject(),
                password: "not show due to security",
                token: JWTtoken
            }
        } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
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
        const hashedPwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_KEY))
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