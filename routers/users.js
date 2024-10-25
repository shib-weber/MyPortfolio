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
        return res.json({message:'Successful',id:user._id})
    }else{
        res.json({message:'Incorrect Email or Password'})
    }
})

router.get('/user/:id',async(req,res)=>{
    const _id = req.params.id
    
    const user = await User.findById({_id});
    if(user.html==='No'){
        res.render('userpage',{html:'No',css:'No'})
    }else{
        res.render('userpage',{html:user.html ,css:user.css})
    }
    
})

router.post('/save/:id', async (req, res) => {
    const _id = req.params.id;  // Extracting the user ID from the URL
    const { html, css } = req.body;  // Extracting HTML and CSS from the request body

    try {
        const user = await User.findByIdAndUpdate(
            _id,            // ID of the user to update
            { html, css },  // Update fields
            { new: true }   // Option to return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/Portfolio/:id',async(req,res)=>{
    const _id = req.params.id
    
    const user = await User.findById({_id});
    if(user.html==='No'){
        res.render('show',{html:'No',css:'No'})
    }else{
        res.render('show',{html:user.html ,css:user.css})
    }
    
})


module.exports=router