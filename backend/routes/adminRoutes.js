const authVerify = require('../middleware/authVerify');
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const router = require('express').Router();


// get all doctors 
router.get('/get-doctors', authVerify, async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get doctor by id
router.get('/get-doctor/:id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json({ message: 'Doctor fetched successfully', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// change doctor status by id in approved
router.put('/approve-doctor/:id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'approved' });
       const user = await User.findOne({_id: doctor.userId})
       const unseenNotifications = user.unseenNotifications;
         unseenNotifications.push({
              type: 'Doctor account approved',
              message: `Your doctor account has been approved`,
              data: {
                doctorId: doctor._id,
                doctorName: doctor.name
              },
              link: `/dashboard/notifications`
            });
            // user.isDoctor make true after doctor approved by admin 
            user.isDoctor = true;
            user.unseenNotifications = unseenNotifications;
            await user.save();
        res.status(200).json({ message: 'Doctor approved successfully', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// block doctor status by id in blocked 
router.put('/block-doctor/:id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'blocked' });
        res.status(200).json({ message: 'Doctor blocked successfully', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// unblock doctor status by id in approved 
router.put('/unblock-doctor/:id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ message: 'Doctor unblocked successfully', doctor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;