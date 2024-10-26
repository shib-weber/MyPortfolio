const mongoose = require ('mongoose');

const UserSchema = mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String,required:true},
    html:{type:String,default:'No'},
    css:{type:String,default:'No'},
    createdAt:{type:Date,default:Date.now}
})

const User = mongoose.model('puser',UserSchema)

module.exports=User