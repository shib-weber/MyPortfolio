const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = require('../models/user')
const mongodb= require('mongodb')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path= require('path')
const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { Readable } = require('stream');

const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

let gfsBucket;
mongoose.connection.once('open', () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads',
    });
});

// Multer setup
const storage = multer.memoryStorage();  // Use memoryStorage since we'll write manually to GridFS
const upload = multer({ storage });

function TokenVerify(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json('No'); // No token, user not authenticated
    }

    const key = process.env.secret_key || 'Hello';
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.json('No'); // Invalid token
        }
        req.user = decoded; // Valid token
        next(); // Proceed to the next middleware or route
    });
}

// Route handler for home page
router.get('/', (req, res) => {
    res.render('home');
});

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
        const key = process.env.secret_key || 'Hello';
        const token = jwt.sign({ email: user.email, userid: user._id }, key, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({message:'Successful',id:user._id})
    }else{
        res.json({message:'Incorrect Email or Password'})
    }
})

router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.json('loggedOut')
})

router.get('/user/:id',TokenVerify,async(req,res)=>{
    const _id = req.params.id
    
    const user = await User.findById({_id});
    if(user.html==='No'){
        res.render('userpage',{html:'No',css:'No'})
    }else{
        res.render('userpage',{html:user.html ,css:user.css})
    }
    
})

router.post('/uploadImg', upload.single('photo'), (req, res) => {
    if (!req.file) {
    return res.status(400).send('No file uploaded');
    }

    // Convert buffer to readable stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(req.file.buffer);
    readablePhotoStream.push(null);

    const uploadStream = gfsBucket.openUploadStream(req.file.originalname);
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
    return res.status(500).json({ message: 'Error uploading file', err });
    });

    uploadStream.on('finish', () => {
    return res.status(201).json({ message: 'File uploaded successfully', fileId: uploadStream.id });
    });
});

router.get('/photo/:idno', async (req, res) => {
    try {
    const { idno } = req.params;

          // Find the document based on idno
const photoDocument = await Photo.findOne({ idno });
if (!photoDocument || !photoDocument.photo) {
return res.status(404).send('Photo not found');
}

          // Extract the fileId from the document
        const fileId = new mongoose.Types.ObjectId(photoDocument.photo);

          // Retrieve the file from GridFSBucket
    const downloadStream = gfsBucket.openDownloadStream(fileId);

        downloadStream.on('error', (err) => {
            return res.status(500).send('Error retrieving file');
        });

          downloadStream.pipe(res); // Stream the file directly to the client
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/save', TokenVerify, async (req, res) => {
    const _id = req.user.userid;
    const { html, css, photo } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            _id,
            { html, css, $push: { photo: { $each: photo } } }, // Append new images
            { new: true }
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


router.post('/saveImg',TokenVerify, async (req, res) => {
    const _id = req.user.userid; 
    const { photo } = req.body;  // Include _id in request body or pass it separately
    
    try {
        const user = await User.findByIdAndUpdate(
            _id, // ID of the user to update
            { $push: { photo } }, // Use $push to add to the array
            { new: true } // Option to return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ success: true, message: 'Photo added successfully', user });
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