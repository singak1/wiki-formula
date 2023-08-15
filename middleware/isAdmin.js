const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAdmin = async (req, res, next) => {
    //verify user is authenticated
    const { authorization } = req.headers

    if(!authorization) {return res.status(401).json({error: 'User is not authorized'})}
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.isAdmin = await User.findOne({ _id }).select('isAdmin')
        next()

    }catch(error) {
        console.log(error)
        res.status(401).json({error: "User not authorized"})
    }
    
}

module.exports = isAdmin