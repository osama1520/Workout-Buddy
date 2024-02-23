const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes= require('./routes/user')
// middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(express.json())

// connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to db and Listening to port',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})

// listen for request
app.use('/api/workouts',workoutRoutes)

app.use('/api/user',userRoutes)
