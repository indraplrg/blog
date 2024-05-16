const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    _id: {
        type: Number,
        required: false,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel