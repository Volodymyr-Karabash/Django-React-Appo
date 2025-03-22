import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/userByIdSlice';
import { useNavigate } from 'react-router-dom';


export default function NotifyNav() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const userById = useSelector(state => state.userById.userById);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserById(user._id))
    }, []);
    return (
        <div className='px-4 d-flex justify-content-between gap-2 shadow rounded py-3'>
            <div className="">
                <i className="bi bi-layout-text-sidebar-reverse fs-5"></i>
            </div>
            {/* <button
                onClick={() => navigate('/dashboard/notifications')}
                type="button"
                style={btnStyle}
                className="btn  position-relative">
                <i className="bi bi-bell-fill fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle rounded-circle" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                    {userById.unseenNotifications?.length}
                </span>
            </button> */}
            <div className="position-relative  pointer " style={{ cursor: "pointer" }} onClick={() => navigate('/dashboard/notifications')}>
                <i className="bi bi-bell-fill fs-5"></i>
                <sup className=' text-center align-content-center  text-white rounded-circle position-absolute ' style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)', display: 'inline-block', width: "20px", height: "20px", top:"-.5em", right:"-.9em" }}>
                    {userById.unseenNotifications?.length}
                </sup>
            </div>
        </div>
    )
}


const btnStyle = {
    paddingRight: "4px",
    paddingBottom: "0px",
    paddingTop: "0px"

}