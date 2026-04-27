import mongoose from "mongoose"


const productSchema=new mongoose.Schema({
    description:{
        required: true,
        type: String
    },
    name: {
        type: String,
        required: true
    },
    productImage:{
        type: String,
    },
    price:{
        type: number,
        default:0
    },
    stock:{
        type:number,
        default: 0
    },
    Category{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    owner{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
},{timestamps:true})



export const Product=mongoose.model("Product",productSchema);