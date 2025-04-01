import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DoctorList from '../components/doctors/DoctorList'
// import {toast} from 'react-toastify'
import { fetchApprovedDoctors } from '../redux/approvedDoctorsSlice';
import useNotify from '../hooks/useNotify';

export default function FindDoctor() {
    const { showNotification } = useNotify();
    const [state, setstate] = useState({
        username: '',
        address: '',
        specialist: '',
        hospital: '',
        reviews: '',
        sortCriteria: '',
        showPerItem: 6,
    })
    const approvedDoctors = useSelector(state => state.approvedDoctors);
    // console.log(approvedDoctors.doctors.length);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchApprovedDoctors())
        showNotification('Welcome', 'Find your desired doctor here!')
    }, []);

    return (
        <div className="py-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-12  py-2 mb-3">
                        <aside className='shadow rounded p-3'>
                            <div className=" position-relative ">
                                <p className='fw-bold text-capitalize ' style={{ color: "#fd4169" }}>find by name </p>
                                <i className="bi bi-search position-absolute  py-2 px-2 border-end"></i>
                                <input type="search" onChange={(e) => { setstate(currentState => ({ ...currentState, username: e.target.value })) }} className="form-control ps-5 border-start " placeholder="Search Doctor..." />
                            </div>
                            <hr />
                            <div className=" position-relative ">
                                <p className='fw-bold text-capitalize ' style={{ color: "#fd4169" }}>find by location </p>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, address: e.target.value })) }}
                                    className='form-select' name="address" id="address">
                                    <option value="">All</option>
                                    {
                                        // unique address 
                                        [...new Set(approvedDoctors.doctors.map(doctor => doctor.address))].map(address => <option key={address} value={address} className='text-capitalize '>
                                            {address}
                                            {/* count */}
                                            ({approvedDoctors.doctors.filter(doctor => doctor.address === address).length})
                                        </option>)
                                    }

                                    {/* <option value="Dhaka">Dhaka</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Barishal">Barishal</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Mymensingh">Mymensingh</option> */}
                                </select>
                            </div>
                            <hr />

                            {/* specialist */}
                            <div className=" position-relative ">
                                <p className='fw-bold text-capitalize ' style={{ color: "#fd4169" }}>find by specialist </p>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, specialist: e.target.value })) }}
                                    className='form-select' name="specialist" id="specialist">
                                    <option value="">All</option>
                                    {
                                        // unique specialist 
                                        [...new Set(approvedDoctors.doctors.map(doctor => doctor.speciality))].map(specialist => <option key={specialist} value={specialist} className='text-capitalize '>
                                            {specialist}
                                            {/* count */}
                                            ({approvedDoctors.doctors.filter(doctor => doctor.speciality === specialist).length})
                                        </option>)
                                    }
                                    {/* <option value="Cardiologist">Cardiologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Ophthalmologist">Ophthalmologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                    <option value="Surgeon">Surgeon</option> */}
                                </select>
                            </div>
                            <hr />

                            {/* hospital */}
                            <div className=" position-relative ">
                                <p className='fw-bold text-capitalize ' style={{ color: "#fd4169" }}>find by hospital </p>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, hospital: e.target.value })) }}
                                    className='form-select' name="hospital" id="hospital">
                                    <option value="">All</option>
                                    {
                                        // unique hospital display and first display All option to show all hospitals 
                                        [...new Set(approvedDoctors.doctors.map(doctor => doctor.hospital))].map(hospital => <option key={hospital} value={hospital} className='text-capitalize '>
                                            {hospital}
                                            {/* count */}
                                            ({approvedDoctors.doctors.filter(doctor => doctor.hospital === hospital).length})
                                        </option>)
                                    }
                                    {/* <option disabled>Select Hospital</option>
                                    <option value="Apollo Hospital">Apollo Hospital</option>
                                    <option value="Square Hospital">Square Hospital</option>
                                    <option value="Labaid Hospital">Labaid Hospital</option>
                                    <option value="United Hospital">United Hospital</option>
                                    <option value="Ibn Sina Hospital">Ibn Sina Hospital</option>
                                    <option value="Popular Hospital">Popular Hospital</option>
                                    <option value="Samorita Hospital">Samorita Hospital</option>
                                    <option value="City Hospital">City Hospital</option> */}
                                </select>
                            </div>
                            <hr />

                            {/* reviews */}
                            <div className=" position-relative ">
                                <p className='fw-bold text-capitalize ' style={{ color: "#fd4169" }}>find by reviews </p>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, reviews: e.target.value })) }}
                                    className='form-select' name="reviews" id="reviews">
                                    <option disabled>Select Reviews</option>
                                    <option value="">All</option>
                                    {
                                        // unique reviews display and first display All option to show all reviews 
                                        [...new Set(approvedDoctors.doctors.map(doctor => doctor.reviews.length))].map(review => <option key={review} value={review} className='text-capitalize '>
                                            {review}  {review === 1 ? 'Review' : 'Reviews'}
                                            {/* count */}
                                            ({approvedDoctors.doctors.filter(doctor => doctor.reviews.length === review).length})
                                        </option>)
                                    }
                                    {/* <option value="1">1 Review</option>
                                    <option value="2">2 Reviews</option>
                                    <option value="3">3 Reviews</option>
                                    <option value="4">4 Reviews</option>
                                    <option value="5">5 Reviews</option> */}
                                </select>
                            </div>
                            <hr />
                            {/* reset button */}
                            <button onClick={() => {
                                setstate({
                                    username: '',
                                    address: '',
                                    specialist: '',
                                    hospital: '',
                                    reviews: '',
                                    sortCriteria: '',
                                    showPerItem: 6,
                                })
                            }} className='btn btn-danger w-100 text-capitalize '>Reset filter</button>

                            {/* price */}

                        </aside>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="container-fluid">
                            {/* sorted */}
                            <div className='py-2 d-flex justify-content-between gap-2'>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, sortCriteria: e.target.value })) }}
                                    name="sort" id="sortFilter" className=" form-select px-4 py-2 rounded focus:outline-none">
                                    <option value="default">Sort by Default</option>
                                    <option value="rating">Sort by Rating</option>
                                    <option value="new">Sort by Newness</option>
                                    <option value="low">Sort by Price: low to high</option>
                                    <option value="high">Sort by Price: high to low</option>
                                </select>
                                <select
                                    onChange={(e) => { setstate(currentState => ({ ...currentState, showPerItem: e.target.value })) }}
                                    name="show" id="showPerItem" className="form-select px-4 py-2 rounded focus:outline-none">
                                    <option selected disabled>Show Doctors per Item</option>
                                    <option value=" ">Show All</option>
                                    <option value="2">Show 2</option>
                                    <option value="6">Show 6</option>
                                    <option value="12">Show 12</option>
                                    <option value="18">Show 18</option>
                                </select>
                            </div>
                            <div className="row">
                                {
                                    approvedDoctors.loading ? <h1>Loading...</h1> :
                                        approvedDoctors.error ? <h1>{approvedDoctors.error}</h1> :
                                            approvedDoctors.doctors.length === 0 ? <h1>No Doctors Found</h1> :
                                                approvedDoctors.doctors
                                                    .filter(doctor => doctor.name.toLowerCase().includes(state.username.toLowerCase()))
                                                    // Adding address filter
                                                    .filter(doctor => state.address ? doctor.address === state.address : true)
                                                    // Adding specialist filter
                                                    .filter(doctor => state.specialist ? doctor.speciality === state.specialist : true)
                                                    // Adding reviews filter
                                                    .filter(doctor => state.reviews ? doctor.reviews.length === parseInt(state.reviews) : true)
                                                    // Adding hospital filter
                                                    .filter(doctor => state.hospital ? doctor.hospital === state.hospital : true)
                                                    // sorted 
                                                    .sort((a, b) => {
                                                        if (state.sortCriteria === 'rating') {
                                                            return b.reviews.length - a.reviews.length
                                                        }
                                                        if (state.sortCriteria === 'new') {
                                                            return new Date(b.createdAt) - new Date(a.createdAt)
                                                        }
                                                        if (state.sortCriteria === 'low') {
                                                            return a.fee - b.fee
                                                        }
                                                        if (state.sortCriteria === 'high') {
                                                            return b.fee - a.fee
                                                        }
                                                        return a
                                                    })
                                                    // .slice(0, state.showPerItem)
                                                    .slice(0, state.showPerItem === ' ' ? approvedDoctors.doctors.length : state.showPerItem)
                                                    .map(doctor => <DoctorList key={doctor._id} doctor={doctor} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
