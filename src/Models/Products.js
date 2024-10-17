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
            min: [1000, 'Price cannot be less than 1000 VND'],
            required: false
        },
        quantity: {
            type: Number,
            min: [1, 'Quantity must be at least 1'],
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