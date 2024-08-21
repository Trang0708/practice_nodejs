import express from 'express'
import {body, validationResult} from 'express-validator'
const router = express.Router()

//get all user
router.get('/', (req,res) => {
    res.send("get users")
})

//get user by id
router.get('/:id',(req,res) => {
    res.send("get user by id " +req?.params?.id ?? +"")
})

//login
router.post('/login',(req,res) => {
    res.send(req.body.username+ " user login")
})

//sign up
router.post(
    '/signup',
    //Email validation
    body('username').isEmail(),
    //Password must has at least 5 characters 
    body('password').isLength({min:5}), 
    (req,res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            const user = {
                "Username" : req.body.username,
                "Password": req.body.password 
            }
            res.send(user)
        } else {
            return res.status(400).json({errors: errors.array()})
        }
})

export default router