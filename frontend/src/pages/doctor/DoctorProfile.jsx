import { useState, useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertTo12HourFormat } from '../../utilis/convertTo12HourFormat';
import { formatPrice } from '../../utilis/formatPrice';
import FetchReviews from '../../components/reviews/FetchReviews';
import AddReviews from '../../components/reviews/AddReviews';
import { getCookie } from '../../utilis/getCookie';
import { fetchReviews } from '../../redux/reviewsSlice';
import TimeSlots from '../../components/TimeSlots';



export default function DoctorProfile() {
    const inputRef = useRef();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const token = getCookie("token")
    const locate = useLocation();
    // console.log(locate)
    const doctor = locate.state;
    // console.log(doctor)
    const reviews = useSelector(state => state.reviews.reviews)
    const dispatch = useDispatch();
    const handleTimeSlots = (e) => {
        setSelectedDate(e.target.value)
        // dispatch(addTimeSlot({ doctorId: doctor._id, date: e.target.value }))
    }
    // console.log(reviews)
    // console.log(id)
    useEffect(() => {
        dispatch(fetchReviews(id));
        inputRef.current.min = new Date().toISOString().split('T')[0];
        inputRef.current.max = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    }, [])
    return (
        <section className='py-5 px-4  '>
            <div className="row">
                <div className="col-lg-8 col-md-12 mb-4">
                    <div className="docProfile bg-white shadow rounded d-flex">
                        <div className="docImg">
                            {/* <img className='p-4 rounded-5 h-100 w-100' src="https://demo.freaktemplate.com/bookappointment/public/upload/doctors/6.jpg" alt="Doctor" /> */}
                            <img width={220} className='p-4 rounded-5' src={doctor.image} alt="Doctor" />
                        </div>
                        <div className="docDetails py-4 px-3">
                            <div className="name-box">
                                <h3 className=' fw-bolder fs-3 text-capitalize' style={{ color: "#fd4169" }}>
                                    {doctor.name} 
                                </h3>
                                <p>{doctor.degree}</p>
                                <span className='text-capitalize fw-bold  '>
                                    {doctor.speciality}
                                </span>
                                
                            </div>
                            <div className="rating">
                                {
                                    Array.from({ length: 5 }, (_, index) => {
                                        let number = index + 0.5;
                                        return (
                                            <label key={index} className='text-3xl cursor-pointer '>
                                                {
                                                    reviews.length >= index + 1 ? (
                                                        <i className='bi bi-star-fill text-warning  '></i>
                                                    ) : reviews.length >= number ? (
                                                        <i className='bi bi-star-half text-warning '></i>
                                                    ) : (
                                                        <i className='bi bi-star text-warning '></i>
                                                    )
                                                }
                                            </label>
                                        )
                                    })
                                }
                                {` (${reviews.length} ${reviews.length > 1 ? 'Reviews' : 'Review'})`}

                            </div>
                            <div className="desc">
                                {/* <span> {doctor.about.slice(0, 50)} </span> */}
                            </div>
                            <div className="location-box d-flex justify-content-between pr-4">
                                <div className="">
                                    <i className="bi bi-geo-alt-fill" style={{ color: "#fd4169" }}></i>
                                    <span>
                                         {doctor.address}
                                    </span>
                                </div>
                                {/* <a className='text-decoration-none text-capitalize' href="">View map</a> */}
                            </div>
                            <div className="contact-box">
                                <i className="bi bi-telephone-fill" style={{ color: "#fd4169" }}></i>
                                <span>  <a className='text-decoration-none text-black' href="tel:1234567890">
                                    {doctor.phone}
                                </a></span>
                            </div>
                        </div>
                    </div>

                    {/* doctor's services */}
                    <div className="services bg-white shadow rounded mt-4">
                        <div className="p-2 rounded-top" style={{ background: "#40b176" }}>
                            <nav>
                                <div className="nav " id="nav-tab" role="tablist">
                                    <button className="nav-link active text-white fw-bold border-end px-5 text-capitalize " id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                                        type="button" role="tab" aria-controls="nav-home" aria-selected="true">about</button>
                                    <button className="nav-link text-white fw-bold border-end px-5" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Location</button>
                                    <button className="nav-link text-white fw-bold border-end px-5" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                                        type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Reviews</button>
                                </div>
                            </nav>
                        </div>
                        {/* content */}
                        <div className="tab-content p-4" id="nav-tabContent">
                            <div className="tab-pane fade show active bg-white" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <h5 className='fw-bolder text-capitalize '>about</h5>
                                <p>
                                    {doctor.experience} years of experience
                                </p>
                                <div dangerouslySetInnerHTML={{  __html: doctor.about  }}/>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <h5 className='fw-bolder'>Location</h5>
                                <p>{doctor.address}</p>
                            </div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <div className="d-flex justify-content-between ">
                                    <h5 className='fw-bolder'>{doctor.name + "'s Reviews"}</h5>
                                    {token && <button className='btn text-white' style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }} onClick={() => setOpen(!open)}>Add Reviews</button>}
                                </div>
                                {open && <AddReviews />}
                                {
                                    reviews.length === 0 ? <h5>No Reviews</h5> :
                                        reviews.map(review => (
                                            <FetchReviews key={review._id} review={review} />
                                        ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 ">
                    {/* appointment book */}
                    <div className="appointmentBook bg-white shadow rounded">
                        <div className=" p-4 rounded-top " style={{ background: "#40b176" }}>
                            <h5 className='fw-bolder text-white fs-3 '>Book Appointment</h5>
                            <p className='text-white-50 '>
                                {/* Monday to Sunday: 9:00 AM to 6:00 PM */}

                                {`Available on ${convertTo12HourFormat(doctor.timeFrom)} to ${convertTo12HourFormat(doctor.timeTo)}`}
                            </p>
                            <p className='text-white-50 '>
                                Consultation Fee : <strong>{formatPrice(doctor.fee)}</strong>
                            </p>
                        </div>
                        <div className="p-3">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date :</label>
                                    <input type="date" onChange={handleTimeSlots} ref={inputRef} className="form-control" id="date" />
                                </div>
                                <div className="mb-3">
                                    {
                                        selectedDate && <TimeSlots key={doctor._id} doctor={doctor} selectedDate={selectedDate} />
                                    }
                                </div>
                                {/* <button type="submit" className="btn text-white w-100 text-capitalize  " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>Book now</button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
