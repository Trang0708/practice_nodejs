import mongoose, {Schema} from "mongoose"
export default mongoose.model('Category',
    new Schema ({
        id: { type: Schema.Types.ObjectId },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    })
)