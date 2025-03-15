const authVerify = require('../middleware/authVerify');
const Appointments = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const router = require('express').Router();

// Get all approved doctors list 
router.get('/get-approved-doctors',  async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'approved' });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get-doctor-info-by-user-id 
router.get('/get-doctor-info-by-user-id/:id', authVerify,  async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.params.id });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update-doctor-info
router.put('/update-doctor-info', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        await Doctor.findByIdAndUpdate(doctor._id, req.body);
        res.status(200).json({ message: 'Doctor info updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get-doctor-info-by-doctor-id
router.post('/get-doctor-info-by-doctor-id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.body.doctorId);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

// get appointments by doctor id
router.post('/get-appointments-by-doctor-id',authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });
        // doctor id is not found
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const appointments = await Appointments.find({ doctorId: doctor._id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// change appointment status by id in approved 
router.put('/approve-appointment/:id', authVerify, async (req, res) => {
    try {
        const appointment = await Appointments.findByIdAndUpdate(req.params.id, { status: 'approved' });
        const user = await User.findOne({ _id: appointment.userId });
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: 'Appointment approved',
            message: `Your appointment has been approved`,
            data: {
                appointmentId: appointment._id,
                doctorName: appointment.doctorInfo.name
            },
            link: `/dashboard/notifications`
        });
        user.unseenNotifications = unseenNotifications;
        await user.save();
        res.status(200).json({ message: 'Appointment approved successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: ' Error Approving appointment ',
            error: error.message});
    }
});

// appointments-by-doctor-id 
router.get('/check-appointments-by-doctor-slots/:id',  async (req, res) => {
    try {
       const appointments = await Appointments.find({ doctorId: req.params.id, status: 'approved'});
         res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// change appointment status by id in rejected deleted
router.put('/reject-appointment/:id', authVerify, async (req, res) => {
    try {
        const appointment = await Appointments.findByIdAndDelete(req.params.id);
        const user = await User.findOne({ _id: appointment.userId });
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: 'Appointment rejected',
            message: `Your appointment has been rejected`,
            data: {
                appointmentId: appointment._id,
                doctorName: appointment.doctorInfo.name
            },
            link: `/dashboard/notifications`
        });
        user.unseenNotifications = unseenNotifications;
        await user.save();
        res.status(200).json({ message: 'Appointment rejected successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: ' Error Rejecting appointment ' });
    }
});


module.exports = router;