import mongoose from 'mongoose';
// const { Schema } = mongoose;
const roomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}],
},{ timestamps : true })
// [
//     {number:101,unavailableDates:[01.05.2022,02.05.2022]},
//     {number:102,unavailableDates:[02.05.2022]},
//     {number:103,unavailableDates:[03.05.2022]},
// ]
export default mongoose.model('Room',roomSchema)