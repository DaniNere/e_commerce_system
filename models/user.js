const mongoose = require('mongoose')

const userShema = mongoose.Schema ({
    name: {
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:64 
    },
    //se o usuário é adm ou cliente
    role:{
        type: Boolean,
        default:0
    },
    picture:{
        type:String,
        default: './avatar.png'
    },
},{timestamp:true}
);

module.exports = mongoose.model('User', userShema)