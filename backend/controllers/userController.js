const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    const token = jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
    return token
}
// login user
const loginUser = async (req,res) => {

    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({email,token,name:user.name})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// signup user

const signupUser = async (req,res) => {
    const {email,password,name} = req.body
    try {
        const user = await User.signup(email,password,name)
        // create token
        const token = createToken(user._id)
        res.status(200).json({email,token,name})
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

module.exports = {loginUser,signupUser}