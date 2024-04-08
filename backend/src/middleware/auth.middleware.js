const jwt = require( 'jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require( '../constants.js')
const { Users } =require( '../models/users.models.js')


 const verifyJwt = async(request,response,next)=>{
    const token = request.cookies.accessToken || request.header("Authorization")?.replace("Bearer ","")
    console.log("TOKEN", token);

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET)
    if(!decodedToken){
        return response.status(400).json({message:"refresh token expired"}) 
    }

    const user = await Users.findById(decodedToken._id)

    if(!user){
        return response.status(402).json({message:"unauthorized request"}) 
    }

    request.user = user
    next()
}

module.exports = verifyJwt