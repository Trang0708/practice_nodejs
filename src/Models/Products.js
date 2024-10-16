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
        quantity: {
            type: Number,
            validate: {
                validator: (value) => value > 0,
                message: "Product quantity must be more than 0"
            },
            required: true
        },
        mfg: {
            type: Date
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }]
    })
)