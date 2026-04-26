import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    content:{
        required: true,
        type: String,
    },
    complete: {
        type: Boolean,
        default: false,

    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    subToDos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subtodo"
        }
    ]//Array of subtodos
},{timestamps: true})

export const Todo=mongoose.model("Todo",todoSchema);