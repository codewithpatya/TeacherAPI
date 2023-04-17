const Teach = require("./Model/Teacher") 

const express = require("express")
const mongoose = require("mongoose")
const app = express()

// middleware
app.use (express.json())


// by default get requst
app.get('/',(req,res)=>{
      res.send("This Is Practice 1")
})

app.listen(5000)

// get request
app.get('/api/Teacher',async (req,res)=>{
    try {
        const data = await Teach.find()
       res.status(200).json({errors:false,data:data}) 
    } catch (error) {
        res.status(400).json({errors:true,message:error.message})
    }
})

mongoose.connect('mongodb+srv://Pratiksha2000:Pratiksha2000@cluster0.sgy5ilc.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,
useUnifiedTopology: true},()=>{
    console.log("Database Connected Successfully");
})

// post
app.post('/api/Teacher',async (req,res)=>{
    try {
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
