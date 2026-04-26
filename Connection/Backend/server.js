import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app=express()


//get a list of 5 jokes
app.get('/api/jokes',(req,resp)=>{
    const j=[
        {
            id:1,
            title: 'Joke 1',
            content: 'This is a joke and it is numbered 1'
        },
        {
            id:2,
            title: 'Joke 2',
            content: 'This is a joke and it is numbered 2'
        },
        {
            id:3,
            title: 'Joke 3',
            content: 'This is a joke and it is numbered 3'
        },
        {
            id:4,
            title: 'Joke 4',
            content: 'This is a joke and it is numbered 4'
        },
        {
            id:5,
            title: 'Joke 5',
            content: 'This is a joke and it is numbered 5'
        },
    ];

    resp.send(j);
})

app.get('/',(req,resp)=>{
    resp.send("Swagatam");
})

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Your server is started at port no. ${port}`);
})