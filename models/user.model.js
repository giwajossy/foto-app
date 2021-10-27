const mongoose = require("mongoose")

// connect db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB is connected"))
.catch((err)=> console.log(err))


const userSchema = new mongoose.Schema({
    query_id: {
        type: String
    }, 
    avatar: {
        type: String
    }, 
    cloudinary_id: {
        type: String
    },
    updated: {
         type: Date, 
         default: Date.now 
    }
})

module.exports = mongoose.model("User", userSchema)