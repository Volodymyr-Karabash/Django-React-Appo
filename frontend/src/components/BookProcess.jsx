import React from 'react'

export default function BookProcess() {
    return (
        <section className=" py-5" style={{ background: "#f7f7f9" }}>
            <div className="container">
                <p className="text-center fw-bold" style={{ color: "#FD4169" }}>PROCESS</p>
                <h2 className="text-center text-black pb-2 fw-bolder fs-1">Appointment Process</h2>
                <div className="row" style={{ backgroundImage: "url('https://demo.freaktemplate.com/bookappointment/public/front_pro/assets/images/icons/arrow-1.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                    <div className="col-md-4">
                        <div className=" text-center">
                            <figure className="icon-box"><img src="https://demo.freaktemplate.com/bookappointment/public/image_web/299186.png" alt="" /></figure>
                            <h5 className="card-title fs-5 fw-bolder text-black " style={{ color: "#767676" }}>1. Search Best Online Doctors</h5>
                            <p className="card-text" style={{ marginBottom: "0" }}>Choose the doctor you want to consult</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="inner-box text-center">
                            <figure className="icon-box"><img src="https://demo.freaktemplate.com/bookappointment/public/image_web/398067.png" alt="" /></figure>
                            <h5 className="card-title fs-5 fw-bold fw-bolder text-black  " style={{ color: "#767676" }}>2. View Doctor Profile</h5>
                            <p className="card-text" style={{ marginBottom: "0" }}>Book an appointment with your doctor</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="inner-box text-center">
                            <figure className="icon-box"><img src="https://demo.freaktemplate.com/bookappointment/public/image_web/483570.png" alt="" /></figure>
                            <h5 className="card-title fs-5 fw-bolder text-black   " style={{ color: "#767676" }}>3. Get Instant Doctor Appoinment</h5>
                            <p className="card-text" style={{ marginBottom: "0" }}>Get instant appointment with your doctor</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
