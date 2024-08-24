import mongoose from "mongoose"
mongoose.set('strictQuery',true)

async function connect () {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB was connected successfully')
        return connection
    } catch (e) {
        debugger
        throw new Error (e.message)
    }
}

export default connect