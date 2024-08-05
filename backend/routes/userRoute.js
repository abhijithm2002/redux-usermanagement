const express = require('express')
const router = express.Router()
 const {registerUser,loginUser,getMe,updateUser, updateProfileImage} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.put('/profile', protect, updateUser)
router.post('/profile',protect, updateProfileImage)

module.exports = router
