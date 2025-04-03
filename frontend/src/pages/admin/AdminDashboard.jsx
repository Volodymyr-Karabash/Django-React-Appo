import React from 'react'

export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* total user */}
            <div className="row mb-4">
                <div className="col-md-6 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total Users</h5>
                                    <h3>
                                        10
                                    </h3>
                                </div>
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* total doctor */}
                <div className="col-md-6 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total Doctors</h5>
                                    <h3>
                                        5
                                    </h3>
                                </div>
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Today's Request </h5>
                                    <h3>
                                        2
                                    </h3>
                                </div>
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                    </div>
                </div>
               
                {/* total pending appointment */}
                <div className="col-md-6 col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Pending Doctors</h5>
                                    <h3>
                                        5
                                    </h3>
                                </div>
                                <i className="bi bi-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Todays Request doctors */}
            <div className="row mb-4">
               
            </div>
        </div>
    )
}
