const express=require('express');

const app=express();
 const morgan=require('morgan');
 const port=4000;
 const mongoose=require('mongoose');
 app.use(morgan('dev'));


 const bodyParser=require('body-parser');
 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://127.0.0.1:27017/edu",{useNewUrlParser:true},(err)=>{
if(err)
{
console.log(err);
}
else{
console.log("DB connected");
}
})

app.get('/',(req,res)=>{
   
  res.sendfile('./index.html');

 })

app.get('/register.html',(req,res)=>{
   
  res.sendfile('./register.html');

 })
const user=require('./users');
app.use('/user',user);
app.listen(port,()=>{
console.log("server running on 4000")
})