import mongoose from "mongoose"
import {print,OutputType} from "../Helpers/print.js"
import Exception from '../Exceptions/exceptions.js'
import * as dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery',true)

async function connect () {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        print('MongoDB was connected successfully', OutputType.SUCCESS)
        return connection
    } catch (e) {
        const {code} = e
        if (code == 8000) {
            throw new Exception (Exception.WRONG_DB_USERNAME_OR_PASSWORD)
        } else if (code == 'ENOTFOUND') {
            throw new Exception (Exception.WRONG_DB_CONNECTION_STRING)
        }

        throw new Exception ("Can't connect to Mongoose")
    }
}

export default connect