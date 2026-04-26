import mongoose from "mongoose";

const subtodoSchema=new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "USer"
    }
},{timestamps: true});

export const Subtodo=mongoose.model("Subtodo",subtodoSchema);