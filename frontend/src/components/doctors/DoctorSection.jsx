import React, { useEffect } from 'react'
import DoctorList from './DoctorList'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedDoctors } from '../../redux/approvedDoctorsSlice';

export default function DoctorSection() {
    const approvedDoctors = useSelector(state => state.approvedDoctors);
    //    console.log(approvedDoctors);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchApprovedDoctors())
    }, []);
    return (
        <section className=" py-5" style={{ background: "#f7f7f9" }}>
            <div className="container">
                <p className="text-center fw-bold" style={{ color: "#FD4169" }}>MEET OUR PROFESSIONALS</p>
                <h2 className="text-center text-black pb-2 fw-bolder fs-1">Our Latest Doctors</h2>
                <div className="row">
                    {
                        approvedDoctors.doctors.slice(0, 3).map(doctor => (
                            <DoctorList key={doctor._id} doctor={doctor} />
                        ))
                    }
                </div>
                {/* see more button */}
                <div className="text-center mt-4">
                    <Link to={'/find-doctor'} className="btn btn-lg text-white" style={{ background: "#FD4169" }}>See More</Link>
                </div>
            </div>

            {/* <h2 className="text-center mt-5">OUR SERVICES</h2>
<p className="text-center">We provide Exceptional Medical Care For Our Patients</p>
<li className="mix green">
<img src="https://abdurraahimm.github.io/capstone/img/doctor_4.jpg" alt="" />
<div className="overlay"></div>
<div className="project_title">
  <a href="#" data-lightbox="roadtrip"><i className="fa-brands fa-facebook-f"></i></a>
  <a href="#" data-lightbox="roadtrip"><i className="fa-brands fa-instagram"></i></a>
<a href="#" data-lightbox="roadtrip"><i className="fa-brands fa-twitter"></i></a>
<a href="#" data-lightbox="roadtrip"><i className="fa-brands fa-linkedin-in"></i></a>
<h4>Dr. Michel Jhonson </h4>
<p>Orthopedic</p>
</div>
</li> */}
        </section>
    )
}
