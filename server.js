require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')))
const port=process.env.PORT||3000;
const mongo=process.env.MONGO_URL;

const connect=async()=>{
    try{
      await  mongoose.connect(mongo);
      console.log('mongoDb is connected');
    }
    catch(error){
        console.error('Database connection failer',error.message)
    }
};
connect();
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
});
const regi= mongoose.model('user',schema);
app.post('/registration',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const newuser =new regi({name,email,password});
        newuser.save();
         res.status(201).json({message:"data save successfully"});
    }
    catch(error){
        console.error('something wrong',error.message)
        res.status(500).json(error)
    }
})
app.get('/registration',async(req,res)=>{
    try{
        const users=await regi.find()
        res.status(200).json(users);
    }catch(error){
        console.error('something wrong',error.message)
        res.status(500).json(error)
    }
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await regi.findOne({email,password});
        if(!user){
             return res.status(401).json({ message: "Invalid credentials" });
        }
           res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
    console.error('Login error', error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port,()=>{
  console.log(`server is runnning at http://localhost:${port}`);
})