import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import userByIdSlice from './userByIdSlice';
import doctorSlice from './doctorSlice';
import approvedDoctorsSlice from './approvedDoctorsSlice';
import reviewsSlice from './reviewsSlice';
import timeSlotSlice from './timeSlotSlice';
import doctorAppointmentsSlice from './doctorAppointmentsSlice';
import userAppointmentsSlice from './userAppointmentsSlice';
import doctorByIdSlice from './doctorByIdSlice';
import appointmentSlice from './appointmentSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        userById: userByIdSlice,
        doctor: doctorSlice,
        doctorById: doctorByIdSlice,
        approvedDoctors: approvedDoctorsSlice,
        reviews: reviewsSlice,
        timeSlots: timeSlotSlice,
        doctorAppointments: doctorAppointmentsSlice,
        userAppointments: userAppointmentsSlice,
        slotsCheckAppointments: appointmentSlice
    }
})

export default store