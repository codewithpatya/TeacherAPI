const Teach = require("./Model/Teacher") 
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv/config')

// middleware
app.use (express.json())
app.use(cors())


// by default get requst
app.get('/',(req,res)=>{
      res.send("This Is Practice 1")
})

app.listen(process.env.PORT)

// get request
app.get('/api/Teacher',async (req,res)=>{
    try {
        const data = await Teach.find()
       res.status(200).json({errors:false,data:data}) 
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})
    }
})

mongoose.connect(process.env.DB,{useNewUrlParser: true,
useUnifiedTopology: true},()=>{
    console.log("Database Connected Successfully");
})

// post
app.post('/api/Teacher',async (req,res)=>{
    try {
        const userExists = await Teach.findOne({name:req.body.name})
        if (userExists) res.json({errors:true,message:"User Already Exists!!"})

        const salt = await bcrypt.genSalt(10) 
        req.body.password = await bcrypt.hash(req.body.password,salt)

        const newTeach = new Teach(req.body) 
        const data = await newTeach.save()
        res.status(200).json({errors:false,data:data})
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})
    }
})

// put
app.put('/api/Teacher/:id',async (req,res)=>{
    try {
        const data = await Teach.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({errors:false,data:data})
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})
    }

})

// delete
app.delete('/api/Teacher/:id',async (req,res)=>{
    try {
        const data = await Teach.findByIdAndDelete(req.params.id)
        res.status(200).json({errors:false,data:data})
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})
    }
})

// login
app.login("/api/Teacher/login",async (req,res)=>{
    try {
        const userExists = await Teach.findOne({name:req.body.name})
        if (!userExists) res.json({errors:true,message:"Invalid Username And Password!!"})

        const CheckPassword = await bcrypt.compare(req.body.password,userExists.password)
        if (!CheckPassword) res.json({errors:true,message:"Invalid Username And Password!!"})

        const token = await jwt.sign({_id:userExists._id},process.env.SEC)

        res.json({errors:false,data:{token:token,user:userExists}})
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})  
    }
})
