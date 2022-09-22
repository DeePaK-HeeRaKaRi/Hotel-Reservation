import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req,res,next) => {
    console.log('verifyToken')
    const token =req.cookies.access_token
    if(!token) {
        return next(createError(401,'You are not authenicated'))
    }
    jwt.verify(token,'qwertyuiop',(err,user) => {
        // userid and isadmin
        if(err){
            return next(createError(403,'You are not authenicated'))
        }
        req.user = user;
        console.log('req.user',req.user)
        next()
    })
}

export const verifyUser = (req,res,next) => {
    console.log('VerifyUser')
    verifyToken(req,res, () => {
    // if(req.user.id === req.params.id || req.user.isAdmin) {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        next()
    }else{ 
        return next(createError(403,'You are not authorized'))
    }
   })
}

export const verifyAdmin = (req,res,next) => {
    console.log('verifyAdmin',req.user)
    verifyToken(req,res, () => {
        console.log('verifyAdmin',req.user)
     if(req.user) {
        console.log('true')
        next()
     }else{
        console.log('false')
        return next(createError(403,'You are not authorized'))
     }
    })
 }