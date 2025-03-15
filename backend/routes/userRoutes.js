const router = require('express').Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointments = require('../models/appointmentModel');
const authVerify = require('../middleware/authVerify');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');


const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});

// user register
router.post('/register',upload.single('profile'), async (req, res) => {
    console.log(req.body);
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            throw new Error('User already exists');
        }
        console.log(req.file);
        // image upload
        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'users',
            width: 500,
            crop: 'scale'
        });

        // password validation
        if (req.body.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            image: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// user login
router.post('/login', async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User does not exist');
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        if (isMatch) {
            // Generate a token
            const Token = jwt.sign({ _id: user._id, username: user.username, image: user.image }, process.env.JWT_SECRET, { expiresIn: '3h' });
            // Store the token in a cookie
            res.cookie('token', Token, {
                maxAge: 3 * 60 * 60 * 1000, // 3 hours
                secure: true,
                sameSite: 'strict'
            });

            // res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username, image: user.image } });
            res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username, image: user.image } });

        } else {
            res.status(400).json({ message: 'Login failed' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// forgot password
router.post('/forgot-password', async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User does not exist');
        }

        // Generate a token
        const Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

        // Send an email
        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Password Reset Notification',
            html: `<h1>Click <a href="http://localhost:5173/reset-password/${Token}">here</a> to reset your password</h1>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error('Email could not be sent');
            }
            res.status(200).json({ message: 'Email sent successfully' });
        }
        );

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// reset password
router.post('/reset-password/:token', async (req, res) => {
    try {
        // Verify the token
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        // throw an error if the token is invalid
        if (!decoded) {
            throw new Error('Invalid token! ');
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(decoded._id, { password: hashedPassword });
        res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});


// logout
router.get('/logout', (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get all users 
router.get('/get-users', authVerify, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get user by id
router.get('/get-user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);

// user delete by id check if user is doctor or not and match email 
router.delete('/delete-user/:id', authVerify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.isAdmin) {
            throw new Error('Admin cannot be deleted');
        }
        if (user.isDoctor) {
            const doctor = await Doctor.findOne({ email: user.email });
            if (doctor) {
                throw new Error('Doctor cannot be deleted');
            }
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// doctor apply account 
router.post('/apply-doctor', authVerify, async (req, res) => {
    try {
        // Check if the doctor already exists
        const doctorExists = await Doctor.findOne({ email: req.body.email });
        if (doctorExists) {
            throw new Error('Doctor already exists');
        }

        // Create a new doctor
        const newDoctor = new Doctor({ ...req.body, status: 'pending' });
        await newDoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: 'New doctor application',
            message: `${newDoctor.name} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                doctorName: newDoctor.name
            },
            link: `/dashboard/doctor-list`
        });

        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(201).json({ message: 'Doctor application submitted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// mark all notification as read by id
router.put('/mark-all-as-read/:id', authVerify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const seenNotifications = user.seenNotifications.concat(user.unseenNotifications);
        await User.findByIdAndUpdate(req.params.id, { unseenNotifications: [], seenNotifications });
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete all notification by id 
router.delete('/delete-all-notifications/:id', authVerify, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { unseenNotifications: [], seenNotifications: [] });
        res.status(200).json({ message: 'All notifications deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});


// users reviews to doctor 
router.post('/review-doctor/:id', authVerify, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        const newReview = {
            text: req.body.text,
            rating: req.body.rating,
            userId: req.body.userId,
            userName: req.body.userName,
            image: req.body.image
        };
        doctor.reviews.push(newReview);
        await doctor.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all reviews of doctor by id 
router.get('/get-reviews/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        res.status(200).json(doctor.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// check time slot availability from doctor timeFrom and timeTo make slot 30 minutes
// router.post('/check-time-slot', authVerify, async (req, res) => {
//     try {
//         const doctor = await Doctor.findById(req.body.doctorId);
//         if (!doctor) {
//             throw new Error('Doctor not found');
//         }
//         const appointments = await Appointment.find({ doctor: req.body.doctorId, date: req.body.date });
//         const timeSlots = [];
//         appointments.forEach(appointment => {
//             timeSlots.push(appointment.time);
//         });
//         res.status(200).json({ message: 'Time slot checked successfully', timeSlots });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// check time slot availability from doctor timeFrom and timeTo make slot 30 minutes
router.post('/check-time-slot', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.body.doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        const appointments = await Appointments.find({ doctorId: req.body.doctorId, date: req.body.date });
        const timeSlots = [];
        res.status(200).json({ message: 'Time slot checked successfully', timeSlots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// book appointment 
router.post('/book-appointment', authVerify, async (req, res) => {
    // console.log(req.body);
    try {
        // Check if the appointment already exists with approved status
        const appointmentExists = await Appointments.findOne({
            userId: req.body.userInfo._id,
            doctorId: req.body.doctorInfo._id,
            date: req.body.date,
            time: req.body.time,
            status: 'approved'
        });
        if (appointmentExists) {
            throw new Error('Appointment already exists');
        }

        let result = { secure_url: '', public_id: '' };
        if (req.body.fileAttach) {
            const filePath = req.body.fileAttach;
            result = await cloudinary.uploader.upload(filePath, {
                folder: 'reports',
            });
        }

        // console.log(req.body.fileAttach);

        // Create a new appointment
        const newAppointment = new Appointments({
            ...req.body,
            image: {
                url: result.secure_url,
                public_id: result.public_id
            },
            status: 'pending'
        });
        console.log(newAppointment);
        await newAppointment.save();

        // Update doctor's unseen notifications
        const user = await User.findOne({ _id: req.body.doctorInfo.userId });
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: 'New appointment',
            message: `${req.body.userInfo.username} has booked an appointment with you`,
            data: {
                appointmentId: newAppointment._id,
                userId: req.body.userInfo._id,
                userName: req.body.userInfo.username,
                date: req.body.date,
                time: req.body.time
            },
            link: `/dashboard/doctor-appointments`
        });
        await user.save();

        // Send success response
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
});


// get appointments by user id 
router.get('/get-appointments/:id', authVerify, async (req, res) => {
    try {
        const appointments = await Appointments.find({ userId: req.params.id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});



module.exports = router;