import express from 'express'
import { createRoom,updateRoom,deleteRoom,getRoom,getRooms } from '../Controllers/rooms.js'
import {verifyAdmin} from '../Utils/verifyToken.js'
// import { createError } from '../Utils/error.js'
const router = express.Router()

router.post('/:hotelid',verifyAdmin,createRoom)
 
router.put('/:id',verifyAdmin,updateRoom)
// router.put('/availability/:id',updateRoomAvailability)
router.delete('/:roomid/:hotelid',verifyAdmin,deleteRoom)

router.get('/:id',getRoom)

router.get('/',getRooms)

export default router