const express = require('express')
const adminRouter = express.Router()
const {adminProtect} = require('../middleware/authMiddleware')
const {adminLogin, getAdmin,getUsers,blockUser,editUser,addUser} = require('../controllers/adminController')

adminRouter.post('/adminLogin', adminLogin)
adminRouter.get('/getAdmin', adminProtect, getAdmin)
adminRouter.get('/getUsers', adminProtect, getUsers)
adminRouter.post('/block', adminProtect, blockUser)
adminRouter.post('/editUser', adminProtect, editUser)
adminRouter.post('/addUser',adminProtect,addUser)

module.exports = adminRouter