import mongoose, { connect } from 'mongoose'

const connectDB =  async (url) => {
    try{
        await mongoose.connect(url)
        .then(() => {
            console.log("database connected successfully")
        })
        .catch(error => {
            console.log(error)
        })
    }catch(error){
        console.log(error)
    }
}

export default connectDB