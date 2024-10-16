import {print, OutputType} from '../Helpers/print.js'

export default class Exception extends Error {
    //Connecting DB error
    static WRONG_DB_USERNAME_OR_PASSWORD = "Wrong database's username or password"
    static WRONG_DB_CONNECTION_STRING = 'Wrong server name/connection string'

    //User handle error
    static USER_EXISTED = "Unable to sign up, this user already exists in data"
    static UNABLE_TO_SIGN_UP = "Unable to sign up new user"
    static WRONG_EMAIL_OR_PASSWORD = "Login failed. Wrong email or password"

    //Products handle error
    static UNEXISTED_CATEGORY = "One or more product's category doesn't exist"
    static UNABLE_TO_ADD_PRODUCT = "Unable to add new product"
    
    constructor (message, validationErrors = {}) {
        super(message)// extends message from Error parrent
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}