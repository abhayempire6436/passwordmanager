const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    url: String,
    username: String,
    password: String,
})

module.exports = mongoose.model("user", userSchema)