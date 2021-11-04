const mongoose = require("mongoose")

// connect db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB is connected"))
.catch((err)=> console.log(err))



const previewEffectSchema = new mongoose.Schema({
    previewURL: {
        type: String
    },
    updated: {
         type: Date, 
         default: Date.now 
    }
})

module.exports = mongoose.model("Effect", previewEffectSchema)