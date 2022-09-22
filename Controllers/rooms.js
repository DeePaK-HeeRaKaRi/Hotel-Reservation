import Room from "../Models/Room.js";
import Hotel from "../Models/Hotel.js";
import {createError} from '../Utils/error.js'
export const createRoom = async(req,res,next) => {
    const hotelId = req.params.hotelid
    const newRoom=new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms : savedRoom._id}})
        }
        catch(err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err) {
        next(err)
    }
}

export const updateRoom = async (req,res,next) => {
    console.log('update Room')
    try{
        // if you not keep {new:true} than it will give the updated fom in postman
        // so after updating it will return the newversion of the document
        const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
        
        res.status(200).json(updateRoom)
    }catch(err) {
        console.log("update Room error")
        next(err)
    }
}
// export const updateRoomAvailability = async (req,res,next) => {
//     console.log('update Rooms')
//     try{
//         // if you not keep {new:true} than it will give the updated fom in postman
//         // so after updating it will return the newversion of the document
//         await Room.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
        
//         res.status(200).json(updatedRoom)
//     }catch(err) {
//         console.log("update Room error")
//         next(err)
//     }
// }
export const deleteRoom = async(req,res,next) => { 
    const hotelId = req.params.hotelid
    try{
        await Room.findByIdAndDelete(req.params.roomid)
        try {
             
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms : req.params.roomid}},{new:true})
            
        }catch(err) {
            next (err)
        }
        res.status(200).json('Room has been deleted.')
    }catch(err) {
        return next(err)
    }
}
 
export const getRoom = async(req,res,next) => { 
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err) {
        return next(err)
    }
}

export const getRooms = async(req,res,next) => { 
   
    // go to next middleware 
    //  our next is rooms see in indexed.js
    // return next()
    // const failed = true
    // const err = new Error()
    // err.status =404
    // err.message = 'Something went wrong !!'
    // if(failed) return next(createError(401,'Something Went Wrong'))
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch(err) {
        // res.status(500).json(err)
        console.log('error in Rooms',err)
        return next(err)
    }
}