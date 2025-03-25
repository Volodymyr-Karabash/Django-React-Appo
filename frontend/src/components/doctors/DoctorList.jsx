import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import DoctorCard from './DoctorCard'
import { convertTo12HourFormat } from '../../utilis/convertTo12HourFormat'
import { formatPrice } from '../../utilis/formatPrice'


export default function DoctorList({ doctor }) {
    // console.log(doctor)
    return (
        <div className="col-md-4 rounded mb-3">
            <div className="rounded " style={{ boxShadow: "0 20px 30px rgba(0,24,73,.1)" }}>
                <div className="card border-0 " >
                    <img height={200} src={doctor.image} alt="Doctor" className="card-img-top rounded-top " />
                    <div className="card-body px-2">
                        <h5 className="card-title fs-5 fw-bold text-capitalize  " style={{ color: "#767676" }}>{doctor.name}</h5>
                        <p className="card-text" style={{ marginBottom: "0" }}> {doctor.speciality} </p>

                        <div className="rating">
                            {
                                Array.from({ length: 5 }, (_, index) => {
                                    let number = index + 0.5;
                                    return (
                                        <label key={index} className='text-3xl cursor-pointer '>
                                            {
                                                doctor.reviews.length >= index + 1 ? (
                                                    <i className='bi bi-star-fill text-warning  '></i>
                                                ) : doctor.reviews.length >= number ? (
                                                    <i className='bi bi-star-half text-warning '></i>
                                                ) : (
                                                    <i className='bi bi-star text-warning '></i>
                                                )
                                            }
                                        </label>
                                    )
                                })
                            }
                            {/* <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star-half text-warning"></i> */}
                            {` (${doctor.reviews.length} ${doctor.reviews.length > 1 ? 'Reviews' : 'Review'})`}
                        </div>
                        <div className="location-box ">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span> {doctor.address}</span>
                        </div>
                        <div className="hospital">
                            <i className="bi bi-hospital-fill"></i>
                            <span> {doctor.hospital}</span>
                        </div>
                        <div className="price">
                            <i className="bi bi-cash"></i>
                            <span> {formatPrice(doctor.fee)}</span>
                        </div>

                    </div>

                    <div className="card-footer">
                        <div className="d-flex justify-content-between ">
                            <span className="fw-bold mt-2" style={{ color: "#FD4169" }}>
                                {/* 9:00 AM to 6:00 PM */}
                                {`${convertTo12HourFormat(doctor.timeFrom)} to ${convertTo12HourFormat(doctor.timeTo)} `}
                            </span>
                            <Link state={doctor} className="border rounded-4 px-2 py-1 text-decoration-none text-capitalize  " to={`/doctor-profile/${doctor._id}`}>View profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
