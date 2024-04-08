
// import { app } from './app.js';
// const app = require('./app.js')
const app = require('./app.js')
// import { connectDB } from './db/index.js';
// const connectDB = require('./db/index.js')
const connectDB = require('./src/db/index.js')
const path = require('path')
const express = require('express')

const PORT = 8080

app.get("/",(req,res)=>{
    res.status(200).send("Hello World from vercelllllll")
})

// app.listen(PORT, ()=>{
//     console.log(`server running on port ${PORT}`);
// })

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch(error=>{
    console.log(error);
})

