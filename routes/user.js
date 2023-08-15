const express =  require('express')
const router = express.Router()
const { loginUser, signupUser } = require('../controllers/userController')

//Login Router
router.post('/login', loginUser)

//Signup Router
router.post('/signup', signupUser)

module.exports = router