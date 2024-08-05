const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password, phone} = req.body
    if(!name || !email || !password || !phone) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check user exit
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        phone,
        
    })

    if(user) {
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            image_url: user.image_url,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})


const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide an email and password');
    }
    // check for user email
    const user = await User.findOne({email})

    if (!user.is_active) {
        res.status(400)
        throw new Error('User is Blocked')
    }

    if(user && (await bcrypt.compare(password,user.password))) {
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            image_url: user.image_url,
            token : generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid Email and Password')
    }

    res.json({message: 'login User'})
})




const getMe = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)
})

const updateUser = asyncHandler(async (req, res) => {
    
    // const userId = req.user._id;
    console.log(req.body);
    const { name, email, phone,id } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields must be filled: name, email, and phone.');
    }

    // Prepare the update data
    const updateData = { name, email, phone };

    // Find the user by ID and update
    const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,  
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Return the updated user data
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
   
    });
}); 

const updateProfileImage = asyncHandler(async(req, res) => {
    const {id, imageUrl} = req.body.userData
    const user = await User.findByIdAndUpdate(id, {image_url : imageUrl}, {new: true})
    if(!user) {
        res.status(400);
        throw new Error('Np Data updated')
    }
console.log("userrrr",user)
    res.status(200).json(user)
})

// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn : '30d',

    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    updateProfileImage
}