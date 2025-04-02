import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUserById } from '../redux/userByIdSlice';
import { getCookie } from '../utilis/getCookie';
import useNotify from '../hooks/useNotify';

export default function Notifications() {
    const { showNotification } = useNotify();
    const navigate = useNavigate();
    const userById = useSelector(state => state.userById.userById);
    const dispatch = useDispatch();
    const token = getCookie('token');
    // console.log(userById)
    const markAllAsRead = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/user/mark-all-as-read/${userById._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                navigate('/dashboard/notifications');
                // refresh the page
                dispatch(fetchUserById(userById._id));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('An error occurred, please try again');
        }
    }

    const deleteAll = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/user/delete-all-notifications/${userById._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                navigate('/dashboard/notifications');
                // refresh the page
                dispatch(fetchUserById(userById._id));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('An error occurred, please try again');
        }
    }

    return (
        <section>
            <h1>Notifications</h1>
            <div className="container card py-4">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-unread-tab" data-bs-toggle="tab" data-bs-target="#nav-unread"
                            type="button" role="tab" aria-controls="nav-unread" aria-selected="true">Unread</button>
                        <button className="nav-link" id="nav-read-tab" data-bs-toggle="tab" data-bs-target="#nav-read"
                            type="button" role="tab" aria-controls="nav-read" aria-selected="false">Read</button>

                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active py-4" id="nav-unread" role="tabpanel" aria-labelledby="nav-unread-tab" tabIndex="0">
                        {
                            userById.unseenNotifications?.length > 0 &&
                            <div className='float-end text-decoration-underline ' style={{ cursor: "pointer" }} onClick={markAllAsRead} > Mark all as read</div>
                        }
                        <div className="mt-5">
                            {
                                // reverse and map the array to show the latest notification first
                                userById.unseenNotifications?.toReversed().map((notification, index) => {
                                    return (
                                        <div key={index} className="card my-2" onClick={() => navigate(notification.link)} style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{notification.type}</h5>
                                                <p className="card-text">{notification.message}</p>
                                                {/* <a href={notification.link} className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade  active py-4" id="nav-read" role="tabpanel" aria-labelledby="nav-read-tab" tabIndex="1">
                        {
                            userById.seenNotifications?.length > 0 &&
                            <div className='float-end text-decoration-underline ' style={{ cursor: "pointer" }} onClick={deleteAll}> Delete all</div>
                        }
                        <div className="mt-5">
                            {
                                userById.seenNotifications?.map((notification, index) => {
                                    return (
                                        <div key={index} className="card my-2" onClick={() => navigate(notification.link)} style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{notification.type}</h5>
                                                <p className="card-text">{notification.message}</p>
                                                {/* <a href={notification.link} className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
