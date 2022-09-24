import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import authRoute from './Routes/auth.js'
import usersRoute from './Routes/users.js'
import hotelsRoute from './Routes/hotels.js'
import roomsRoute from './Routes/rooms.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from "morgan";
const app = express()
var corsOptions={
  origin:'http://localhost:3000',
  optionsSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(morgan('common'))
// require('dotenv/config')
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect('******')
        console.log('Connected to mongoDB')
      } catch (error) {
        console.log('!! Error connecting to mongoDB !!')
        throw error;
      }
}
mongoose.connection.on('disconnected',() =>{
    console.log('Mongodb disconnected')
})
// app.get('/',(req,res) => {
//     res.json({key:'Hello '})
// })
// if not kept you cannot send any json data
// and able to reach req,res before sending

// middlewares
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)


// app.use((req,res,next) => {
//   res.send('Hi i have interrupted your route')
//   // console.log('Hi iam a middleware')
// })
app.use((err,req,res,next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})
app.listen(8800, () => {
    connect()
    console.log('Connected to backend!')
})