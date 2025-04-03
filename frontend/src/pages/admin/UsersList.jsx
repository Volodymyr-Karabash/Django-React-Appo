import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../redux/userSlice';
import { toast } from 'react-toastify';
import { getCookie } from '../../utilis/getCookie';

export default function UserList() {
  const token = getCookie("token");
  const [state, setState] = useState({
    search: '',
  });
  const user = useSelector(state => state.user);
  // console.log(user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUserDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/user/delete-user/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          dispatch(fetchUsers());
        } else {
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error.message)
      }
    }
  }
  return (
    <section className='py-2'>
      <div className="d-flex justify-content-between ">
        <h3>User List</h3>
        <div className="form-group">
          <input
            onChange={(e) => { setState({ ...state, search: e.target.value }); }}
            type="search"
            className="form-control"
            width={400}
            autoComplete='off'
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
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user.loading ? <tr><td>
                <div style={{ color: "#FD4169" }} className="spinner-border text-primary  " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td></tr> :
                user.error ? <tr><td>{user.error}</td></tr> :
                  user.user
                    .filter(user => user.username.toLowerCase().includes(state.search.toLowerCase()) || user.phone.includes(state.search))
                    .map(user => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {
                            user.isAdmin ? `Admin` : user.isDoctor ? `Doctor` : `User`
                          }
                        </td>
                        <td>
                          <button onClick={() => handleUserDelete(user._id)} className='btn btn-sm btn-danger'>Delete</button>
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
