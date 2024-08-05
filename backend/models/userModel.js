const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please add a name']
    },
    email : {
        type : String,
        required : [true, 'Please add an email'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please add a password']
    },
    phone : {
        type : Number,
        required : [true, 'Please add a phone number']
    },
    image_url : {
        type : String
    },
    is_admin : {
        type : Boolean,
        default : false
    },
    is_active : {
        type: Boolean,
        default: true
    }
},
{
    timeStamps : true
})

module.exports = mongoose.model("User",userSchema)