const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
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

router.get('/signin',(req,res)=>{
    res.render('login')
})

router.get('/user',(req,res)=>{
    res.render('userpage')
})
module.exports=router