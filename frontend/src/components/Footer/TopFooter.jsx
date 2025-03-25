import React from 'react'

export default function TopFooter() {
    return (
        <div style={{ background: "#1a2332" }} className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3" style={{ backgroundImage: "url('https://demo.freaktemplate.com/bookappointment/public/front_pro/assets/images/shape/shape-30.png')", backgroundSize: "cover" }}>
                        <img className="" src="./logo.png" alt="" />
                        <span className="fw-bold fs-4 text-white">Dr.</span>
                        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-white fw-bolder mb-4">Services</h5>
                        <ul className=" list-group-flush " style={{ paddingLeft: "0px" }}>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">Find Doctor</a></li>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">Book Appointment</a></li>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">Consultation</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-white fw-bolder mb-4">About</h5>
                        <ul className=" list-group-flush " style={{ paddingLeft: "0px" }}>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">About Us</a></li>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                            <li className="list-group-item "><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3" style={{ backgroundImage: "url('https://demo.freaktemplate.com/bookappointment/public/front_pro/assets/images/shape/shape-31.png')", backgroundSize: "cover" }}>
                        <h5 className="text-white fw-bolder mb-4 text-capitalize">Contact info</h5>
                        <ul className=" list-group-flush " style={{ paddingLeft: "0px" }}>
                            <li className="list-group-item ">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span className="text-white"> 123, Dhaka, Bangladesh</span>
                            </li>
                            <li className="list-group-item ">
                                <i className="bi bi-telephone-fill"></i>
                                <span className="text-white"> 123-456-7890</span>
                            </li>
                            <li className="list-group-item ">
                                <i className="bi bi-envelope-fill"></i>
                                <span className="text-white">   admin@mail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
