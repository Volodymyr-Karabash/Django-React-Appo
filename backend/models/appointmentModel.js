const mongoose = require('mongoose'); 

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    },
    doctorInfo: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    symptoms: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
    
}, {timestamps: true});

const Appointments = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointments;