import JWT from "jsonwebtoken"
//import http status code
import httpStatusCode from '../Exceptions/HttpStatusCode.js'
//enviroment config
import * as dotenv from 'dotenv'
dotenv.config()

export default function checkToken (req, res, next) {
    //check token doesn't apply for login and register request
    if (req.url.toLowerCase().trim() == "/users/login" || req.url.toLowerCase().trim() == "/users/signup") {
        next()
        return
    }

    //other request still need to check token before progess response
    //get token
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        const jwtObject = JWT.verify(token, process.env.JWT_KEY)
        //check if token get expired
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if (isExpired) {
            res.status(httpStatusCode.NOT_FOUND).json({ message: "Token is expired" })
            res.end()
        } else {
            next()
            return
        }
    } catch (e) {
        res.status(httpStatusCode.NOT_FOUND).json({ message: e.toString() })
    }

}
