import mongoose from "mongoose"

//child schema for selecting the order quantity and all and keep the track of it 
const orderItemSchema=mongoose.schema({
    productId:{
        type:mongoose.schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type: number,
        required: true
    }
})

const orderSchema=mongoose.schema({
    orderPrize:{
        type:number,
        required:true
    },
    customer:{
        type:mongoose.schema.Types.ObjectId,
        ref: "User"
    },
    orderItems:{
        type:[orderItemSchema],
    },
    adress:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["PENDING", "Cancelled", "Delivered"],
        default: "Pending"
    }
},{timestamps: true})

export const Order=mongoose.model("Order",orderSchema);