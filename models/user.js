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
    passwordHash:{
        type:String,
        required:true,
        min:6,
        max:64 
    },
    //se o usuário é adm ou cliente
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
}},{timestamp:true}
);

module.exports = mongoose.model('User', userShema)