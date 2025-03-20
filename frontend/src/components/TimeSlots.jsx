import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateTimeSlots } from '../utilis/generateTimeSlots';
import { getCookie } from '../utilis/getCookie';
import { toast } from 'react-toastify';
import { fetchUserById } from '../redux/userByIdSlice';
import { slotsCheckAppointments } from '../redux/appointmentSlice';


export default function TimeSlots({ doctor, selectedDate }) {
    const [status, setStatus] = useState('idle');
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const userById = useSelector(state => state.userById.userById);
    const slotsCheck = useSelector(state => state.slotsCheckAppointments);
    const [btnValue, setBtnValue] = useState('');
    const [diseaseSymptoms, setDiseaseSymptoms] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(user._id));
        dispatch(slotsCheckAppointments(doctor._id));
    }, []);

    const dataPass = (e) => {
        e.preventDefault();
        setBtnValue(e.target.getAttribute('data-value'));
    };

    const handleSymptomsChange = (e) => {
        setDiseaseSymptoms(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
            
        };
        console.log(file);
    };
    

    const bookAppointment = async (e) => {
        e.preventDefault();
        const token = getCookie('token');
        if (!token) {
            toast.error('Please login first');
            return;
        }
        // symtoms validation
        if (!diseaseSymptoms) {
            toast.error('Please write down your disease symptoms');
            return;
        }
        // file validation
        // if (file) {
        //     const fileSize = file.size / 1024 / 1024;
        //     if (fileSize > 5) {
        //         toast.error('File size should be less than 5MB');
        //         return;
        //     }
        //     const fileType = file.type.split('/')[1];
        //     if (fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png') {
        //         toast.error('File type should be jpg, jpeg or png');
        //         return;
        //     }
        //     if (file.type === 'application/pdf') {
        //         toast.error('PDF file not allowed');
        //         return;
        //     }
        // }
       
        // Now you can send 'data' to your backend or do whatever processing you need
        // console.log(data);
        setStatus('Booking...');
        try {
            const res = await fetch('http://localhost:3000/api/user/book-appointment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user._id,
                    doctorId: doctor._id,
                    userInfo : userById,
                    doctorInfo : doctor,
                    date: selectedDate,
                    time: btnValue,
                    symptoms: diseaseSymptoms,
                    fileAttach: file
                })
            });
            const result = await res.json();
            if (res.ok) {
                setStatus('idle');
                toast.success(result.message)
                // close the modal
                document.querySelector('.btn-close').click();
            } else {
                setStatus('idle');
                toast.error(result.error)
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <>
            <label htmlFor="timeSlot" className="form-label">Time Slot :</label>
            <div className="modal fade" id="openModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase" id="exampleModalLabel">Confirm Appointment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to book an appointment with {doctor.name} on {selectedDate} at {btnValue}?</p>
                            <div className="mb-3">
                                <label htmlFor="diseaseSymptoms" className="form-label">Disease Symptoms:</label>
                                <textarea
                                    className="form-control"
                                    name="diseaseSymptoms"
                                    placeholder="Write down your disease symptoms"
                                    id="diseaseSymptoms"
                                    rows="3"
                                    value={diseaseSymptoms}
                                    onChange={handleSymptomsChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fileAttach" className="form-label">Attach Previous Reports if you have (only image):</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="file"
                                    id="fileAttach"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={bookAppointment} className="btn text-white text-capitalize" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                                {status === 'Booking...' ? 'Booking...' : 'Book Appointment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex gap-2 flex-wrap">
                {generateTimeSlots(doctor.timeFrom, doctor.timeTo, 30).map((time, index) => {
                    let isAppointmentBooked = false;
                    slotsCheck.appointments.forEach(appointment => {
                        if (appointment.date.split("T")[0] === selectedDate && appointment.time === time) {
                            isAppointmentBooked = true;
                        }
                    })
                    return (
                        <button
                            key={index}
                            data-value={time}
                            onClick={dataPass}
                            className={`btn border text-uppercase`}
                            style={{
                                cursor: isAppointmentBooked ? 'not-allowed' : 'pointer',
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#openModal"
                            aria-disabled={isAppointmentBooked}
                            disabled={isAppointmentBooked}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
