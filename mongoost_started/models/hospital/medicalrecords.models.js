import mongoose from "mongoose"

const medicalSchema=mongoose.Schema({},{timestamps:true})

export const Medical=mongoose.model("Medical",medicalSchema);