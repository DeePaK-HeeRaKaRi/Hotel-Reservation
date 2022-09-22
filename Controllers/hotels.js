 
import Hotel from '../Models/Hotel.js'
import Room from '../Models/Room.js'
export const createHotel = async (req,res,next) => {
    const newHotel= new Hotel(req.body)
 
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err) {
        next(err)
    }
}

export const updateHotel = async (req,res,next) => {
    console.log('update hotel')
    try{
        // if you not keep {new:true} than it will give the updated fom in postman
        // so after updating it will return the newversion of the document
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
        res.status(200).json(updatedHotel)
    }catch(err) {
        console.log("update hotel error")
        next(err)
    }
}
export const deleteHotel = async(req,res,next) => { 
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted.')
    }catch(err) {
        return next(err)
    }
}
 
export const getHotel = async(req,res,next) => { 
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err) {
        return next(err)
    }
}

export const getHotels = async(req,res,next) => { 
   
    // go to next middleware 
    //  our next is rooms see in indexed.js
    // return next()
    // const failed = true
    // const err = new Error()
    // err.status =404
    // err.message = 'Something went wrong !!'
    // if(failed) return next(createError(401,'Something Went Wrong'))
    const {max,min,...others} = req.query
    try{
        // const hotels = await Hotel.find(req.query).limit(req.query.limit)
        const hotels= await Hotel.find({
            ...others,
            cheapestPrice :{$gt : min | 1 , $lt:max || 10000},
        }).limit(req.query.limit)
        res.status(200).json(hotels)
    }catch(err) {
        // res.status(500).json(err)
        console.log('error in hotels',err)
        return next(err)
    }
}
// api/hotels/countByCity?cities=hyderabad,vizag

export const countByCity = async(req,res,next) => { 
   const cities=req.query.cities.split(",")
    try{
        const list=await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err) {
        // res.status(500).json(err)
        console.log('error in hotels',err)
        return next(err)
    }
}

export const countByType = async(req,res,next) => {
    // const types=req.query.types.split(",")
    //  try{
    //      const list=await Promise.all(types.map(type => {
    //          return Hotel.countDocuments({type:type})
    //      }))
    //      res.status(200).json(list)
    //  }catch(err) {
    //      // res.status(500).json(err)
    //      console.log('error in hotels',err)
    //      return next(err)
    //  }
    try{
        const hotelsCount = await Hotel.countDocuments({type:'hotel'})
        const apartmentsCount = await Hotel.countDocuments({type:'apartment'})
        const resortsCount = await Hotel.countDocuments({type:'resort'})
        const villasCount = await Hotel.countDocuments({type:'villa'})
        const cabinsCount = await Hotel.countDocuments({type:'cabin'})

        res.status(200).json([
            {type:'hotel',count:hotelsCount},
            {type:'apartment',count:apartmentsCount},
            {type:'resort',count:resortsCount},
            {type:'villa',count:villasCount},
            {type:'cabin',count:cabinsCount},
        ])
    }catch(err) {
        next(err)
    }
 }
 export const getHotelRooms = async(req,res,next) => {
    try {
        const hotel =await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(err) {
        next(err)
    }
 }