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

module.exports=router