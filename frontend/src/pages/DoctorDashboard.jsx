import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorAppointments } from '../redux/doctorAppointmentsSlice';

export default function DoctorDashboard() {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const doctorAppointments = useSelector(state => state.doctorAppointments.appointments);
    // console.log(doctorAppointments)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDoctorAppointments(user._id))
    }, [])
    return (
        <>
            <h1>Doctor Dashboard</h1>

            {/* total patient */}
            <div className="row mb-4">
                <div className="col-md-4  mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total Patient</h5>
                                    <h3>
                                        {

                                            doctorAppointments.filter(appointment => appointment.userInfo).length
                                        }
                                    </h3>
                                </div>
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* total appointment */}
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total Appointments</h5>
                                    <h3>
                                        {
                                            doctorAppointments.length
                                        }
                                    </h3>
                                </div>
                                <i className="bi bi-calendar3"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* total pending appointment */}
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Pending Appointments</h5>
                                    <h3>
                                        {
                                            doctorAppointments.filter(appointment => appointment.status === 'pending').length
                                        }
                                    </h3>
                                </div>
                                <i className="bi bi-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* total completed appointment */}
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className=''>Completed Appointments</h5>
                                    <h3>
                                        {
                                            doctorAppointments.filter(appointment => appointment.status === 'approved').length
                                        }
                                    </h3>
                                </div>
                                <i className="bi bi-check"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* total reviews */}
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total Reviews</h5>
                                    <h3>
                                        {
                                            // doctor  reviews length 
                                            doctorAppointments.filter(appointment => appointment.review).length
                                        }
                                    </h3>
                                </div>
                                <i className="bi bi-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* today appointment */}
            <div className="card">
                <div className="card-header">
                    <h4>Today's Appointments</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped ">
                            <thead>
                                <tr>
                                    <th>Patient image</th>
                                    <th>Patient Name</th>
                                    <th>Time</th>
                                    <th>Symptom</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    doctorAppointments.filter(appointment => new Date(appointment.date).toLocaleDateString() === new Date().toLocaleDateString()).map(appointment => (
                                        <tr key={appointment._id}>
                                            <td>
                                                <img src={appointment.userInfo.image.url} alt={appointment.userInfo.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                            </td>
                                            <td>{appointment.userInfo.username}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.symptoms}</td>
                                            <td>
                                                {
                                                    appointment.status === 'pending' ? <span className="badge bg-warning">Pending</span> :
                                                        appointment.status === 'approved' ? <span className="badge bg-success">Approved</span> :
                                                            <span className="badge bg-danger">Cancelled</span>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
