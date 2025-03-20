import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doctorMenus } from '../data/doctorMenus';
import { adminMenus } from '../data/adminMenus';
import { userMenus } from '../data/userMenus';
import { fetchUserById } from '../redux/userByIdSlice';

export default function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const userById = useSelector(state => state.userById.userById);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserById(user._id))
    }, []);
    const menus = userById.isDoctor ? doctorMenus : userById.isAdmin ? adminMenus : userMenus;
    return (
        <aside className='dashboard-sidebar shadow rounded p-2 text-white   min-vh-100' style={{ background: '#40b176' }}>

            <div className="d-flex flex-column flex-shrink-0  " >
                <div className="">
                   {/* center image */} 
                   {/* <img width={130} src={`http://localhost:3000/${userById.image}`} alt="profile" className="img-fluid rounded-circle  mx-auto   " /> */}
                    <img src={user.image.url} alt="user" className="rounded-circle mx-auto d-block" width={130} />
                    <h5 className='text-center text-capitalize'>
                        {userById.username} ({
                            userById.isDoctor ? 'Doctor' : userById.isAdmin ? 'Admin' : 'User'

                        })
                    </h5>
                </div>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto gap-3  ">
                    {
                        menus.map((menu, index) => {
                            return (
                                <li key={index} className="nav-item fs-6 w-100">
                                    <NavLink to={menu.path}
                                        style={
                                            ({ isActive }) => {
                                                return {
                                                    background: isActive ? "rgba(16, 43, 29, 0.3)" : "",
                                                    padding: isActive ? "3px 7px" : "",
                                                    borderRadius: isActive ? "5px" : "",
                                                }
                                            }

                                        }
                                        className="nav-item text-white text-decoration-none text-capitalize" >
                                        <i className={`${menu.icon} me-2`} ></i>
                                        {menu.name}
                                    </NavLink>
                                </li>
                            )
                        })


                    }


                </ul>
                <hr />

            </div>

        </aside>
    )
}
