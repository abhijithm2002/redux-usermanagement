const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const adminLogin = asyncHandler(async(req, res)=> {
    const {email, password} = req.body
    const user = await User.findOne({email})
    console.log(user)
    if(user && user.is_admin && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            is_active : user.is_active,
            image_url : user.image_url,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

const getAdmin = asyncHandler(async (req, res) => {
    res.json(req.user)
})

const getUsers = asyncHandler(async(req, res)=> {
    const users = await User.find({is_admin : false})
    if(!users) {
        res.status(400)
        throw new Error('User not found')
    } else {
        console.log('get user' , users)
        res.status(200).json(users)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    const userId = req.body.userId
    const user  = await User.findById(userId)
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    } 
    user.is_active = !user.is_active
    await user.save()
    const users = await User.find({is_admin : false})
    res.status(200).json(users)

})

const editUser = asyncHandler(async(req, res)=> {
    const {id,name, email} = req.body.userData
    const userExits = await User.findOne({email})
    const user = await User.findByIdAndUpdate(id,{name, email})
    const users = await User.find({is_admin : false})
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    } 
    console.log('editusers',users)
    res.status(200).json(users)

})

const addUser = asyncHandler(async(req, res) => {
    const {name, email, password, phone} = req.body.userData
    if(!name || !email || !password || !phone) {
        res.status(400)
        throw new Error('Enter valid data')
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone
    })

    const users = await User.find({ isAdmin: false })

    if (user) {
        res.status(200).json({ users })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = {
    adminLogin,
    getAdmin,
    getUsers,
    blockUser,
    editUser,
    addUser
}