import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorAppointments } from '../redux/doctorAppointmentsSlice'
import { getCookie } from '../utilis/getCookie';
import { toast } from 'react-toastify';

export default function DoctorAppointments() {
  const [search, setSearch] = useState('');
  const token = getCookie('token');
  const user = JSON.parse(localStorage.getItem('user')) || [];
  const doctorAppointments = useSelector(state => state.doctorAppointments);
  // console.log(user)
  // console.log(doctorAppointments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDoctorAppointments(user._id))
  }, [])
  const handleApproved = async (id) => {
    const res = await fetch(`http://localhost:3000/api/doctor/approve-appointment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.message)
    }
    else {
      toast.success(data.message)
      dispatch(fetchDoctorAppointments(user._id))
    }
  };
  const handleRejected = async (id) => {
    const res = await fetch(`http://localhost:3000/api/doctor/reject-appointment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.message)
    }
    else {
      toast.success(data.message)
      dispatch(fetchDoctorAppointments(user._id))
    }
  };
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
        <table className='table table-striped table-bordered table-hover text-center'>
          <thead>
            <tr>
            <th> image</th>
              <th> Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th> Date</th>
              <th> Time</th>
              <th> Symptom </th>
              <th> Report </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
            <td>John Doe</td>
            <td> jon@mmail.com </td>
            <td> 1234567890 </td>
            <td> 123 Main Street </td>
            <td> 12/12/2021 </td>
            <td> 12:00 PM </td>
            <td> <span className='badge bg-success'>pending</span> </td>
            <td>
              <button className='btn btn-sm btn-success me-2'>Approve</button>
              <button className='btn btn-sm btn-danger'>Reject</button>
            </td>
          </tr> */}
            {
              doctorAppointments.loading ?
                <tr>
                  <td colSpan='7' className='text-center'>
                    <div style={{ color: "#FD4169" }} className="spinner-border text-primary  " role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr> :
                doctorAppointments.error ?
                  <tr>
                    <td colSpan='7' className='text-center text-danger'>{doctorAppointments.error}</td>
                  </tr> :
                  doctorAppointments.appointments
                    .filter(appointment => appointment.userInfo.username.toLowerCase().includes(search.toLowerCase()) || appointment.userInfo.phone.includes(search))
                    .map(appointment => (
                      <tr key={appointment._id}>
                        <td> <img src={appointment.userInfo.image.url} alt={appointment.userInfo.username} width='40' height='40' className='rounded-circle' /> </td>
                        <td>{appointment.userInfo.username}</td>
                        <td>{appointment.userInfo.email}</td>
                        <td>{appointment.userInfo.phone}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{appointment.time}</td> 
                        <td>{appointment.symptoms}</td>
                        <td>
                          {
                          //  image url is empty then show no report else show the image
                          appointment.image.url ? 
                          <a href={appointment.image.url} target='_blank' rel='noreferrer' className='btn btn-sm btn-primary'>View </a> : 
                          <span className='text-muted'>No Report</span>
                          }
                        </td>
                        <td> <span className={`badge ${appointment.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>{appointment.status}</span> </td>
                        <td className='d-flex gap-1'>
                          {
                            appointment.status === 'pending' ?
                              <>
                                <button onClick={() => handleApproved(appointment._id)} className='btn btn-sm btn-success '>Approve</button>
                                <button onClick={() => handleRejected(appointment._id)} className='btn btn-sm btn-danger'>Reject</button>
                              </> :
                              <span className='text-muted'>Approved</span>
                          }
                          {/* <button className='btn btn-sm btn-danger'>Reject</button> */}
                        </td>
                      </tr>
                    ))

            }
          </tbody>
        </table>
      </div>

    </section>
  )
}
