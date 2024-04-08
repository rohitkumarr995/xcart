
const { Users } = require('../models/users.models.js');
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET} = require('../constants.js');
const APIError = require('../utils/APIError.js');
const nodeMailer = require('nodemailer')

const generateAccessAndRefreshToken = async(userId)=>{
    const user = await Users.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken

    await user.save({validateBeforeSave:false})

    return {accessToken, refreshToken}
}
 
const registerUser = async (request, response)=>{
    const {username, fullname, email, contact, password} = request.body
   
    //check if any property is empty
    const userData = [username, fullname, email, contact, password].some(prop=> prop.trim() =="" )

    if(userData){
        return response.status(400).json({message:"bad request, invalid details"})
    }

    //check if user already exists
    const isUserExists = await Users.findOne({$or:[{username:username}, {email:email}]})
    if(isUserExists){
        return response.status(403).json({message:"user already exists"})
    }

    const user = await Users.create({username:username.toLowerCase(), fullname,email,contact,password})

    const createdUser = await Users.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        return response.status(204).json({message:"user not created"})
    }

    return response.status(201).json({createdUser,message:"user created successfully"})
}

const userLogin = async function(request, response){
    const {username, email, password} = request.body

    if(!(username && password)){
        return response.status(400).json({message:"username or password required"})
    }

    const user = await Users.findOne({
        $or:[{username:username},{email:email}]
    })

    let searchedUser =  await Users.findOne({username:username})
    if(!searchedUser){
        return response.status(401).json({message:"invalid username or email"})
    }

    let searchedEmail =  await Users.findOne({email:email})
    if(!searchedEmail){
        return response.status(401).json({message:"invalid username or email"})
    }

    const passwordCorrect = await user.isPasswordCorrect(password)

    
    if(!passwordCorrect){
        return response.status(406).json({message:"incorrect password"})
    }

    const {accessToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await Users.findById(user._id).select("-password -refreshToken")

    const options ={
        httpOnly : true, 
        secure:true,
        sameSite: "none",
        withCredentials: true,
        expire:new Date() + 9999,
        path: '/'
    }

    return response.status(200)
    .cookie('accessToken',  accessToken, options)
    .json({user: loggedInUser, accessToken, message:"user logged in successfully"})
}

const userLogout = async function(request, response){

    await Users.findByIdAndUpdate(request.user._id, {
        $set:{refreshToken:undefined}
    },{new:true})

    const options = {
        httpOnly : true, 
        secure:true,
        sameSite: "none",
        withCredentials: true,
        path: '/'
    }

    return response.status(200)
    .clearCookie("accessToken", options)
    .json({message:"user logged out successfullly"})
}

const addProductToUserCart = async (request, response)=>{
    const productCategory = request.params.productCategory
    const {clientAccesssToken , cart} = request.body
    //verify the jwt token (refresh token)    
    const decodedToken = jwt.verify(clientAccesssToken, ACCESS_TOKEN_SECRET)

    //now decoded token has user info (mongodb user document)
    if(!decodedToken){
        return response.status(400).json({message:"refresh token expired"}) 
    }

    //finding user
    const user = await Users.findById(decodedToken._id)
    console.log(user);

    if(!user){
        return response.status(402).json({message:"unauthhorized request"}) 
    }

    //adding the product item into cart
    const userCart = await Users.findOneAndUpdate({_id:user._id}, { $push:{'cart':cart}}, {new : true})

    console.log(userCart);

    if(!userCart){
        return response.status(402).json({message:"unauthhorized cart request"}) 
    }
    
    return response.status(202).json({userCart, message: "product added successfully in cart"})
}

const fetchUserDetails = async(request, response)=>{
    try {
        const {clientAccesssToken} = request.body
    
        if(!clientAccesssToken){
            throw new APIError(400, "Token is missing")
        }
    
        const decodedToken = jwt.verify(clientAccesssToken, ACCESS_TOKEN_SECRET)
    
        if(!decodedToken){
            return new APIError(401, "Invalid Token")
        }
    
        const user = await Users.findById(decodedToken._id)
        if(!user){
            throw new APIError(404, "User not found")
        }
    
        return response.status(200).json({user, message:"user fetched successfully"})
    } catch (error) {
        return new APIError(500, "Internal server error")
    }
}

const removeProductFromcart = async(request,response)=>{
    const {clientAccesssToken, productId} = request.body
    if(!clientAccesssToken){
        throw new APIError(400, "Token is missing")
    }

    const decodedToken = jwt.verify(clientAccesssToken, ACCESS_TOKEN_SECRET)
    if(!decodedToken){
        throw new APIError(401, "Invalid Token")
    }

    const user = await Users.findById(decodedToken._id)
    if(!user){
        throw new APIError(404, "User not found")
    }

    const product = await Users.findByIdAndUpdate(user._id,{$pull:{'cart':{_id:productId}}})
    console.log(product);
    
    return response.status(200).json({user:user.cart, message:"product removed successfully"})
}

const clearCartFromUser = async (request,response)=>{
    const {clientAccesssToken} = request.body
    if(!clientAccesssToken){
        throw new APIError(400, "Token is missing")
    }

    const decodedToken = jwt.verify(clientAccesssToken, ACCESS_TOKEN_SECRET)
    if(!decodedToken){
        throw new APIError(401, "Invalid Token")
    }

    const user = await Users.findById(decodedToken._id)
    if(!user){
        throw new APIError(404, "User not found")
    }

    const product = await Users.findByIdAndUpdate(user._id,{$unset:{'cart':true}})


    return response.status(200).json({user:user, message:"cart removed successfully"})
}

const placeOrder = async(request, response)=>{
    const {clientAccesssToken, perfInfo, product} = request.body

    if(!clientAccesssToken){
        throw new APIError(400, "Token is missing")
    }

    const decodedToken = jwt.verify(clientAccesssToken, ACCESS_TOKEN_SECRET)
    if(!decodedToken){
        throw new APIError(401, "Invalid Token")
    }

    const user = await Users.findById(decodedToken._id)
    console.log("USER",user);
    if(!user){
        throw new APIError(404, "User not found")
    }

    const document = await Users.findByIdAndUpdate(user._id,{$push:{'order':product}})

    const updatedUserCart = await Users.findByIdAndUpdate(user._id,{$unset:{'cart':true}})

    return response.status(200).json({user:user, message : "order placed successfully"})
}

const sendConfirmationMail = async(request,response)=>{

    const {email,subject,message} = request.body
    let testAccount = await nodeMailer.createTestAccount()

    let transport = await nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:"rkrs227@gmail.com",
            pass:"zqct mwbd jxke gnke"
        }
    })

    const mailOption={
        from:"rkrs227@gmail.com",
        to:email,
        subject:subject,
        html:`<h1>${message}</h1>`,
    }

    
    transport.sendMail(mailOption, function(error,info){ 
        if(error){
            console.log(error);
        }else{
            
            console.log("Mail sent successfully");
            
        }
    })
    
}

module.exports =  {registerUser, 
        userLogin, 
        userLogout, 
        addProductToUserCart, 
        fetchUserDetails, 
        removeProductFromcart,
        clearCartFromUser,
        placeOrder,
        sendConfirmationMail
    }