const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = require('../models/user')
const mongodb= require('mongodb')
const path= require('path')

const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',async(req,res)=>{
    const {email , password}= req.body;
    const response = await User.create({
        email,
        password,
    })
    return res.json('Done')
})

router.get('/signin',(req,res)=>{
    res.render('login')
})

router.post('/signin', async(req,res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({email, password});

    if(user){
        return res.json('Successful')
    }else{
        res.json('Incorrect Email or Password')
    }
})

router.get('/user',(req,res)=>{
    res.render('userpage')
})
module.exports=router