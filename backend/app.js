
const express = require('express')
const cors = require('cors') 
// const userRoute = require('./routes/user.routes.js')
const userRoute = require('./src/routes/user.routes.js')
// const productRoute = require('./routes/product.routes.js')
const productRoute = require('./src/routes/product.routes.js')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  })
  
app.use(cors({
    origin:["http://localhost:3000","https://xcart-client.vercel.app"],
    methods:["GET","POST","PATCH","PUT","DELETE"],
    withCredentials:true,
    exposedHeaders: ["set-cookie"]
}))
app.use(cookieParser())
app.use(express.json({limit:"25kb"}))

app.use(express.static('build'))
app.use('/api/v1/users', userRoute)
app.use('/api/v1/products', productRoute)

module.exports = app