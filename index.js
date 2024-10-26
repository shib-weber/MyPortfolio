const express =require('express')
const bodyParser = require('body-parser');
const userRouter= require('./routers/users')
const mongoose = require('mongoose')
const mongodb= require('mongodb')
const path= require('path')

const app = express();
const PORT = 7000;
const MongoUrl='mongodb://127.0.0.1:27017/Portfolio'

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))


mongoose.connect(MongoUrl).then(()=>{
    console.log('Mongodb Connected')
})

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(userRouter);

app.listen(PORT,()=>{
    console.log("Server is Running in PORT",PORT)
})