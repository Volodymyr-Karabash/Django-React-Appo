const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        minlength: 3    
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'password must have at least (6) caracters'],

    },
    phone:{
        type: String,
        trim: true,
        required: [true, 'Please provide a phone number'],
        match: [/^\d{11}$/, 'Please provide a valid phone number']
    },
    gender:{
        type: String,
        required: [true, 'Please provide Gender'],
        enum: ['male', 'female']
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
   

} , {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;