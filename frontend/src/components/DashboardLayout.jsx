import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar';
import NotifyNav from './NotifyNav';

export default function dashboardLayout() {
    return (
        <div className="py-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-12  py-2 ">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-md-12">
                        <div className="container-fluid">
                            <NotifyNav />
                            <div className="row">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
