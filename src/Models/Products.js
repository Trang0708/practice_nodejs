import mongoose, {Schema} from "mongoose"
export default mongoose.model('Product',
    new Schema ({
        id: { type: Schema.Types.ObjectId },
        name: {
            type: String,
            validate: {
                validator: (value) => value.length > 5,
                message: "Product name must be longer than 3"
            }
        },
        price: {
            type: Number,
            validate: {
                validator: (value) => value > 1000,
                message: "Product price must be bigger than 1000"
            },
            required: false
        },
        mfg: {
            type: Date
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    })
)