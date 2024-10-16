import mongoose, {Schema} from "mongoose"
//sub document (CartItem) schema for items in the cart
const CartItem = new Schema({
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    } // Quantity of the product in the cart
});

export default mongoose.model('Cart',
    new Schema ({
        id: { type: Schema.Types.ObjectId },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            validate: {
                validator: (value) => {
                    const status = ["active","pending_checkout", "abandoned"]
                    return status.includes(value)
                },
                message: "Cart status must be active/pending_checkout/abandoned"
            },
        },
        items: [CartItem],
    }, 
    //Tracking created at and updated at
    {timestamp: true}
    )
)