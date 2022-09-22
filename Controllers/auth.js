import User from '../Models/User.js'
import bcrypt from 'bcryptjs'
import {createError} from '../Utils/error.js'
import jwt from 'jsonwebtoken'
export const register = async(req,res,next) => {
    try {
        // we can write req.body.password 
        //  here we have to encode the password for security
        // https://www.npmjs.com/package/bcryptjs
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword,
            isAdmin : req.body.isAdmin
        })
        await newUser.save()
        res.status(200).send('User has been created successfully !!')
    }catch(err) {
        next(err)
    }
}

export const login = async(req,res,next) => {
    try {
        // console.log(req.body)
        // const userEmail=await User.findOne({email:req.body.email})
        // console.log('user data',userEmail)
        // if(userEmail) {
        //     const isPasswordCorrect = await bcrypt.compare(req.body.password,userEmail.password)
        //     console.log(isPasswordCorrect)
        //     if(isPasswordCorrect) {
        //        return res.status(200).json('Successfully Logged In !!')
        //     }else{
        //         return next(createError(404,'Invalid Email or Password'))
        //     }
        // }else{
        //     return next(createError(404,'User Not Found !!'))
        // }
        // res.status(200).json('Successfully Logged In !!')

        const userEmail=await User.findOne({email:req.body.email})
        console.log('userEmail',userEmail)
        if(!userEmail) return next(createError(404,'User Not Found !!'))

        const isPasswordCorrect = await bcrypt.compare(req.body.password,userEmail.password)
        if(!isPasswordCorrect) return next(createError(404,'Invalid Email or Password'))
        // her iam not sending the password and admin to client

        const token=jwt.sign(
            {id:userEmail._id,isAdmin:userEmail.isAdmin},
            'qwertyuiop',   
        )
        const {password,isAdmin, ...otherDetails} = userEmail._doc
        res.cookie('access_token',token,{httpOnly : true}).status(200).json({...otherDetails})
    }catch(err) {
        next(err)
    }
}