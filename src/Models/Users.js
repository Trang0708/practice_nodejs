import mongoose, {Schema} from "mongoose"
import isEmail from "validator/lib/isemail.js"
export default mongoose.model('User',
    new Schema ({
        id: { type: Schema.Types.ObjectId },
        username: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.toString().length >3 ,
                message: "Username must be longer than 5"
            }
        },
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail(value),
                message: "Email is incorrect format"
            }
        },
        password: {
            //gonna hash and encrypt later
            type: String,
            required: true
            //validate??
        },
        phoneNumber: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true
        }
    })
)