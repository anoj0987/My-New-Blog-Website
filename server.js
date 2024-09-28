const express = require('express');
const { register } = require('module');
const mongoose = require('mongoose')
const path = require('path')
require ("dotenv").config();

const pass=process.env.PASSWORD


const port=4000

const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect(`mongodb+srv://manojbhakta481:${pass}@cluster0.6l61u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Index.html'))
})
 app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'Index.html'))
 })

app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    const newUser = new User({
        name,
        email,
        password,
     })
     await newUser.save()
    res.send("Thank you for Registration")
})

app.post('/login',async(req,res)=>{
    try{        
       const email=req.body.email;
       const password=req.body.password;

       const useremail = await User.findOne({email:email});

       if (!useremail) {
        return res.status(400).send("Invalid Email");
      }
       if(useremail.password === password){
        res.sendFile(path.join(__dirname, 'Index.html'));
         
       }

    }catch(error)
    {
       res.status(400).send("invalid Email")
    }
})

app.listen(port,()=>{
    console.log("Server started")
})