const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userModel = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    isAdmin : {
        type: Number,
        default: 0,
    },
    password : {
        type: String,
        required: true
    }
})
//static login method NOTE: CANT USE ARROW FUNCTION TO USE "this" property
userModel.statics.login = async function(email, password) {
    //validation
    if(!email || !password) {throw Error("Please provide all required fields")}
    const user = await this.findOne({ email })                                      //Get user
    if(!user) {throw Error("Invalid Credentials")}
    const match = await bcrypt.compare(password, user.password)                     //Compare proivded password with hashed password
    if(!match) {throw Error("Inavlid Credentials")}
    return user
}

//static signup method NOTE: CANT USE ARROW FUNCTION TO USE "this" property
userModel.statics.signup = async function (email, username, password) {
    //validation
    if(!email || !password) {throw Error("Please provide all required fields")}
    if(!validator.isEmail(email)) {throw Error("Please provide a valid email")}
    if(!validator.isStrongPassword(password)) {throw Error("Provide a strong password")}
    const existsEmail = await this.findOne({email})
    if(existsEmail) {throw Error('Email already in use')}
    const existsUsername = await this.findOne({username})
    if(existsUsername) {throw Error('Username already in use')}

    //generate salt
    const salt = await bcrypt.genSalt(12)
    //hash password
    const hash = await bcrypt.hash(password, salt)
    //add to db
    const user = await this.create({ email, username, password: hash})
    return user
}

module.exports = mongoose.model('User', userModel)