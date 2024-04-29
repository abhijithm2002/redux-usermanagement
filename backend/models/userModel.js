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
},
{
    timeStamp : true
})

module.exports = mongoose.model("User",userSchema)