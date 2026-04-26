require('dotenv').config()

const express=require('express')
const app=express()
// const port = 2345

app.get('/',(req,resp)=>{
    resp.send("Kya haal hai bhau");
})

app.get('/t',(req,resp)=>{
    resp.send("<h1>Padhle bhai kya karega twitter chla ke</h1>")
})


app.get('/tw',(req,resp)=>{
    resp.send("<h1>Padhle bhai kya karega twitter chla ke</h1> <h2>Matlab nhi manega besharm hi rhega </h2>")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})