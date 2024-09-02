import mongoose, {Schema} from "mongoose"
import { isEmail } from "validator"
export default mongoose.model('User',
    new Schema ({
        id: { type: Schema.Types.ObjectId },
        username: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message: "Username must be longer than 3"
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