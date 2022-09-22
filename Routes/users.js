import express from 'express'
import { updateUser,deleteUser,getUser,getUsers } from '../Controllers/users.js'
import {verifyAdmin, verifyToken,verifyUser} from '../Utils/verifyToken.js'
// import { createError } from '../Utils/error.js'
const router = express.Router()
// router.get('/checkAuthenication',verifyToken,(req,res,next) => {
//     res.send('You are loggedin')
// })
router.get('/checkuser/:id',verifyUser,(req,res,next) => {
    res.send('hello user, you are logged in and you can delte your accoun')
})

router.get('/checkadmin/:id',verifyAdmin,(req,res,next) => {
    res.send('hello Admin, you are logged in and you can access all your customers account')
})

router.put('/:id',verifyUser,updateUser)

router.delete('/:id',verifyUser,deleteUser)

router.get('/:id',verifyUser,getUser)

router.get('/',verifyAdmin,getUsers)

export default router