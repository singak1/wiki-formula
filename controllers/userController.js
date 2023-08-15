const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h'})
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)              //calling static login function
        const token = createToken(user._id)                         //create token for user
        res.status(200).json({email, token})
    } catch(error) {res.status(400).json({error: error.message})}
}

//signup user
const signupUser = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.signup(email, username, password)   //calling static signup function
        const token = createToken(user._id)                         //create token for user
        res.status(200).json({email, token})
    }
    catch (error) { res.status(400).json({error: error.message})}
}

module.exports = { loginUser, signupUser }