import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUserById } from '../redux/userByIdSlice';
import { getCookie } from '../utilis/getCookie';

export default function BookAppointment() {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const userById = useSelector(state => state.userById.userById);
    const dispatch = useDispatch();
    const locate = useLocation();
    const { doctor, btnValue, selectedDate } = locate.state;
    // console.log(doctor, btnValue, selectedDate);
    const token = getCookie('token');
    useEffect(() => {
        dispatch(fetchUserById(user._id));
    }, []);

    const bookAppointment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = {
            userId: userById._id,
            doctorId: doctor._id,
            userInfo: userById,
            doctorInfo: doctor,
            date: selectedDate,
            time: btnValue,
            symptoms: formData.get('diseaseSymptoms'),
            report: formData.get('report')
        };

        // Now you can send 'data' to your backend or do whatever processing you need
        try {
            const res = await fetch('http://localhost:3000/api/user/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        }
        catch (err) {
            toast.error('Something went wrong');
        }

    }
    return (
        <section className="min-vh-100 pt-5   " style={{ backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)' }} >
            <div className="container">
                <div className="row  shadow" style={{ height: '33rem' }}>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1630854912/undraw_Medicine_re_cwkc (1).svg" alt="book appointment" className="img-fluid" />
                    </div>
                    <div className="col-md-6 bg-white rounded-end d-flex justify-content-center align-items-center">
                        <div className="">
                            <h1>Confirm Appointment</h1>
                            <form onSubmit={bookAppointment}>
                                <div className="mb-3">
                                    <label htmlFor="diseaseSymptoms" className="form-label">Disease Symptoms:</label>
                                    <textarea
                                        className="form-control"
                                        name="diseaseSymptoms"
                                        placeholder="Write down your disease symptoms"
                                        id="diseaseSymptoms"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="report" className="form-label">Upload Previous Reports if you have (pdf or image):</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="report"
                                        id="report"
                                    />
                                </div>
                                <button type="submit" className="btn text-white text-capitalize w-100" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>Book Confirm</button>
                                {/* <button type="submit" className="btn btn-primary">Book Confirm</button> */}
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
