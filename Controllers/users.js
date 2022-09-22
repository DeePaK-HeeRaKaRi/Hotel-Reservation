 
import User from '../Models/User.js'
export const updateUser = async (req,res,next) => {
    try{
        // if you not keep {new:true} than it will give the updated fom in postman
        // so after updating it will return the newversion of the document
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
        res.status(200).json(updatedUser)
    }catch(err) {
        next(err)
    }
}
export const deleteUser = async(req,res,next) => { 
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted.')
    }catch(err) {
        return next(err)
    }
}
 
export const getUser = async(req,res,next) => { 
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err) {
        return next(err)
    }
}

export const getUsers = async(req,res,next) => { 
   
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err) {
        // res.status(500).json(err)
        console.log('error in Users',err)
        return next(err)
    }
}