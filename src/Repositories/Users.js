/*IMPORT LIBRARY AND MIDDELWARE*/
import { print, OutputType } from "../Helpers/print.js"

//login
const login = async ({email, password}) => {
    print('User login successfully', OutputType.SUCCESS)
}

//sign up
const signup= async ({
    username,
    email,
    password,
    phoneNumber,
    role
}) => {
    print ('New user was added', OutputType.SUCCESS)
    print('Sign up new user with: ' + '\n' +
                'User name: ' + username + '\n' +
                'Email: ' + email + '\n' +
                'Password: ' + password + '\n' +
                'Phone number: ' + phoneNumber + '\n' +
                'Role: ' + role + '\n', OutputType.INFORMATION)
}

export default {
    login,
    signup
}