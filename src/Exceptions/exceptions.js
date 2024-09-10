import {print, OutputType} from '../Helpers/print.js'

export default class Extension extends Error {
    //Connecting DB error
    static WRONG_DB_USERNAME_OR_PASSWORD = "Wrong database's username or password"
    static WRONG_DB_CONNECTION_STRING = 'Wrong server name/connection string'

    //User handel error
    static USER_EXISTED = "Unable to sign up, this user already exists in data"
    static UNABLE_TO_SIGN_UP = "Unable to sign up new user"
    
    constructor (message) {
        super(message)// extends message from Error parrent
        print(message, OutputType.ERROR)
    }
}