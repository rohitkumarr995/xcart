const mongoosee = require('mongoose')
const bcrypt = require( 'bcrypt')
const jwt = require( 'jsonwebtoken')
const {ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET} = require(  '../constants.js')


const personalInformationSchema = new mongoosee.Schema({
    personalInfo:{
        type:Array
    }
})
const userSchema = new mongoosee.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    fullname:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique:true,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }, 
    cart :{
        type:Array
    },
    order:{
        type:Array
    }
},
    {
        timestamps:true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id
    },
    ACCESS_TOKEN_SECRET,
    {
        expiresIn:ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id:this._id
    },
    REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    })
}

const Users = mongoosee.model("users", userSchema)

module.exports = {Users}