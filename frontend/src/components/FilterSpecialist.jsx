import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedDoctors } from '../redux/approvedDoctorsSlice';
import DoctorList from './doctors/DoctorList';


export default function FilterSpecialist() {
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const approvedDoctors = useSelector(state => state.approvedDoctors.doctors);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchApprovedDoctors())
        setFilteredDoctors(approvedDoctors)
    }, [])
  
    const uniqueSpecialists = [...new Set(approvedDoctors.map(doctor => doctor.speciality))]

    const filterBySpecialist = (specialist) => {
        const filteredDoctors = approvedDoctors.filter(doctor => doctor.speciality === specialist)
        setFilteredDoctors(filteredDoctors)
    }

    return (
        <section className=" py-5">
            <div className="container">
                <p className="text-center fw-bold text-uppercase " style={{ color: "#FD4169" }}>Find the right specialist for you</p>
                {/* <h2 className="text-center text-black pb-2 fw-bolder fs-1">Top Rated Specialists</h2> */}
                <h2 className="text-center text-black pb-2 fw-bolder fs-1">Find Specialist</h2>
                {/* filter button */}
                <div className="text-center mb-4">
                    <button onClick={() => setFilteredDoctors(approvedDoctors)} className="btn btn-sm text-white me-2 text-capitalize " style={{ background: "#FD4169" }}>All</button>
                    {
                        uniqueSpecialists.map((specialist, index) => (
                            <button key={index} onClick={() => filterBySpecialist(specialist)} className="btn btn-sm text-white me-2 text-capitalize " style={{ background: "#FD4169" }}>{specialist}</button>
                        ))
                    }
                </div>
                <div className="row">
                    {
                        filteredDoctors.slice(0,7).map(doctor => (
                            <DoctorList key={doctor._id} doctor={doctor} />
                        ))
                    }

                </div>
            </div>
        </section>
    )
}
