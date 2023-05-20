const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 4500;
const DATABASE_URL = process.env.DATABASE_URL;
// const DATABASE_NAME = process.env.DATABASE_NAME;
const mongoose = require('mongoose');
mongoose.connect(DATABASE_URL);
console.log(`Connected at ${PORT} || NewsSharing`)
const User = require('./User');
const Admin = require('./Admin');
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin : "https://newsshare.netlify.app"
}));
let News = require('./News');



app.post('/login',async (req,res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select('-password');
        if(user){
            res.send(user);    
        }else{
            res.send({result:"User Not Found"});
        }
    }else{
        res.send({result:"User Not Found"});
    }
});

app.post('/adminlogin',async (req,res)=>{
    if (req.body.username && req.body.password){
        let result = await Admin.find(req.body);
        if(result.length>0){
            res.send(result);
        }else{
            res.send({result:"No Account with this Detail"});
        }
    }else{
        res.send({result:"Enter Valid Syntax"});
    }
    
});

app.post('/signup',async (req,res)=>{
    if(req.body.name && req.body.email && req.body.password && req.body.contact 
        && req.body.city){
            try{
                let user = new User(req.body);
                let result = await user.save();
                res.send(result);    
            }catch{
                res.send({Status:"User Already Exisy"})
            }
            
        }else{
            res.send("Syntax Error");
        }
    
});

app.post('/addnews',async (req,res)=>{
    if (req.body.heading && req.body.subheading && req.body.content
        && req.body.addby){
        let data = new News(req.body);
        let result = await data.save();
        res.send(result);
    }else{
        res.send({Status:"Syntax Error"})
    }
});

app.get('/allnewsadmin',async (req,res)=>{
    let data = await News.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.send({Status:"Table is Empty"});
    }
    
});

app.delete('/deletenews/:id',async (req,res)=>{
    let data = await News.deleteOne({_id:req.params.id});
    res.send(data);
});

app.get('/searchnews-admin/:key',async (req,res)=>{
    console.log("Search");
    let result = await News.find({
        "$or":[
            { heading:{$regex:req.params.key,$options: 'i'} },
            { subheading:{$regex:req.params.key} }
        ]
    });
    res.send(result);
});
//$options: 'i' :- is use to remove case sensitive search.

app.put('/updatenewsadmin/:key',async (req,res)=>{
    let result = await News.updateOne(
        {_id: req.params.key },
        {$set: req.body }
    );
    if(result){res.send(result);}
    else{res.send({result:"Can't Update data"});} 
});

app.put('/updatenewsuser/:key',async (req,res)=>{
    console.log("Called");
    console.log(req.body);
    let result = await News.updateOne(
        {_id: req.params.key },
        {$set: req.body }
    );
    res.send(result);
});

app.get('/getallnewsadmin/:key', async (req,res)=>{
    let result = await News.findOne({_id:req.params.key});
    res.send(result);
});

app.get('/allnewsuser',async (req,res)=>{
    let data = await News.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.send({Status:"Table is Empty"});
    }
    
});

app.post('/addnewsuser',async (req,res)=>{
    if (req.body.heading && req.body.subheading && req.body.content
        && req.body.addby){
        let data = new News(req.body);
        let result = await data.save();
        res.send(result);
    }else{
        res.send({Status:"Syntax Error"})
    }
});

app.get('/usernews/:key',async (req,res)=>{
    let result = await News.find({addby:req.params.key});
    if(result.length>0){
        res.send(result);
    }else{
        res.send({Status:"No News Added Yet"});
    }
    
});

app.get('/getallnewsuser/:key', async (req,res)=>{
    let result = await News.findOne({_id:req.params.key});
    res.send(result);
});

app.get('/getuser/:key',async (req,res)=>{
    let result = await User.findOne({_id:req.params.key});
    res.send(result);
});

app.put('/updateuser/:key',async (req,res)=>{
    let result = await User.updateOne(
        {_id:req.params.key},
        { $set: req.body }
    );
    res.send(result);
});

app.get('/searchnews-user/:key',async (req,res)=>{
    let result = await News.find({
        "$or":[
            { heading:{$regex:req.params.key,$options: 'i'} },
            { subheading:{$regex:req.params.key,$options: 'i'} }
        ]
    });
    res.send(result);
});

app.get('/alluser',async (req,res)=>{
    let result = await User.find();
    res.send(result);
});

app.listen(process.env.PORT || 4500);