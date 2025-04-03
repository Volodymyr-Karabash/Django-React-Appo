import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserAppointments } from '../redux/userAppointmentsSlice';

export default function UserAppointment() {
    const [search, setSearch] = useState('')
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const userById = useSelector(state => state.userById.userById)
    const userAppointments = useSelector(state => state.userAppointments);
    // console.log(userAppointments)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserAppointments(user._id))
    }, [])
    return (
        <section className='py-2'>
            <div className="d-flex justify-content-between ">
                <h3>Appointment List</h3>
                <div className="form-group">
                    <input
                        onChange={(e) => { setSearch(e.target.value) }}
                        type="search"
                        className="form-control"
                        width={400} autoComplete='off'
                        name="search"
                        id="search"
                        placeholder='Search by name or Phone number' />
                </div>

            </div>

            <div className='table-responsive'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Hospital</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userAppointments.loading ?
                                <tr>
                                    <td colSpan='7' className='text-center'>
                                        <div style={{ color: "#FD4169" }} className="spinner-border text-primary  " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr> :
                                userAppointments.error ?
                                    <tr>
                                        <td colSpan='7' className='text-center'>{userAppointments.error}</td>
                                    </tr> :
                                    userAppointments.appointments
                                        .filter(appointment => appointment.doctorInfo.name.toLowerCase().includes(search.toLowerCase()) || appointment.doctorInfo.phone.includes(search))
                                        .map(appointment => (
                                            <tr key={appointment._id}>
                                                <td> {appointment.doctorInfo.name} </td>
                                                <td> {appointment.doctorInfo.email} </td>
                                                <td> {appointment.doctorInfo.phone} </td>
                                                <td> {appointment.doctorInfo.hospital} </td>
                                                <td> {new Date(appointment.date).toLocaleDateString()} </td>
                                                <td> {appointment.time} </td>
                                                <td> <span className='badge bg-success'>{appointment.status}</span> </td>
                                            </tr>
                                        ))
                        }
                    </tbody>
                </table>
            </div>

        </section>
    )
}
