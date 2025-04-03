import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/doctorSlice';
import { toast } from 'react-toastify';
import { getCookie } from '../../utilis/getCookie';

export default function DoctorList() {
  const [state, setState] = React.useState({
    search: '',
  });
  const token = getCookie('token');
  const doctor = useSelector(state => state.doctor);
  // console.log(doctor._id)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  const handleApprovedDoctor = async (doctorId) => {
    console.log(doctorId);
    const response = await fetch(`http://localhost:3000/api/admin/approve-doctor/${doctorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      toast.error('Server error');
    } else {
      toast.success('Doctor approved successfully');
      dispatch(fetchDoctors());
    }
  };

  const handleBlockedDoctor = async (doctorId) => {
    // console.log(doctorId);
    const response = await fetch(`http://localhost:3000/api/admin/block-doctor/${doctorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      toast.error('Server error');
    } else {
      toast.success('Doctor blocked successfully');
      dispatch(fetchDoctors());
    }
  };

  const handleUnblockedDoctor = async (doctorId) => {
    // console.log(doctorId);
    const response = await fetch(`http://localhost:3000/api/admin/unblock-doctor/${doctorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      toast.error('Server error');
    } else {
      toast.success('Doctor unblocked successfully');
      dispatch(fetchDoctors());
    }
  };
  return (
    <section className='py-2'>
      <div className="d-flex justify-content-between ">
        <h3>Doctor List</h3>
        <div className="form-group">
          <input
            onChange={(e) => { setState({ ...state, search: e.target.value }); }}
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
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              doctor.loading ? <tr><td>
                <div style={{ color: "#FD4169" }} className="spinner-border text-primary  " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td></tr> :
                doctor.error ? <tr><td>{doctor.error}</td></tr> :
                  doctor.doctors
                    .filter(doctor => doctor.name.toLowerCase().includes(state.search.toLowerCase()) || doctor.phone.includes(state.search))
                    .map(doctor => (
                      <tr key={doctor._id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.address}</td>
                        <td>{doctor.speciality}</td>
                        <td>{doctor.status}</td>
                        <td>
                          {doctor.status === 'pending' && <button onClick={() => handleApprovedDoctor(doctor._id)} className='btn btn-sm btn-success'>Approve</button>}
                          {doctor.status === 'approved' && <button onClick={() => handleBlockedDoctor(doctor._id)} className='btn btn-sm btn-danger'>Block</button>}
                          {doctor.status === 'blocked' && <button onClick={() => handleUnblockedDoctor(doctor._id)} className='btn btn-sm btn-danger'>Unblock</button>}

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
