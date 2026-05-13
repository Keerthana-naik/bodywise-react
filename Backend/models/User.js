
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: String
},
{
    timestamps: true
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel


