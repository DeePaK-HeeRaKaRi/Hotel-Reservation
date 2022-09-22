import express from 'express'
import { createHotel,updateHotel,deleteHotel,
    getHotel,getHotels,countByCity,countByType,getHotelRooms} from '../Controllers/hotels.js'
import {verifyAdmin} from '../Utils/verifyToken.js'
// import { createError } from '../Utils/error.js'
const router = express.Router()

router.post('/',verifyAdmin,createHotel)
 
router.put('/:id',verifyAdmin,updateHotel)


router.delete('/:id',verifyAdmin,deleteHotel)

router.get('/:id',getHotel)

router.get('/',getHotels)
router.get('/find/countByCity',countByCity)
router.get('/find/countByType',countByType)
router.get('/room/:id',getHotelRooms)
export default router