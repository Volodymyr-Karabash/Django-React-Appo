import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDoctorById, updateDoctorInfo } from '../redux/doctorByIdSlice';

export default function DoctorInfo() {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const { doctor, loading, error } = useSelector(state => state.doctorById);
    // console.log(doctor);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDoctorById(user._id));
        ClassicEditor
            .create(document.querySelector('#editor'))
            .catch(error => {
                console.error(error);
            });
    }, [])
    const handleUpdateDoctorInfo = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const formData = {
                userId: user._id,
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                address: form.address.value,
                about: form.about.value,
                speciality: form.speciality.value,
                degree: form.degree.value,
                experience: form.experience.value,
                hospital: form.hospital.value,
                fee: form.fee.value,
                timeFrom: form.timeFrom.value,
                timeTo: form.timeTo.value,
            }

            dispatch(updateDoctorInfo(formData));
            toast.success('Doctor info updated successfully');
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <section>
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className='text-capitalize'>Update Doctor info</h2>
                        <p>Fill the form below to Update Doctor info</p>
                        <hr />
                        <h3 className='text-capitalize'>Personal information</h3>

                        <form onSubmit={handleUpdateDoctorInfo} >
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' defaultValue={doctor.name || ''} className="form-control" id="name" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' defaultValue={doctor.email || ''} className="form-control" id="email" required />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" defaultValue={doctor.phone || ''} className="form-control" id="phone" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" name="address" className="form-control" id="address" defaultValue={doctor.address || ''} required />
                                    </div>
                                </div>
                                {/* say about yourself */}
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="about">Say about yourself</label>
                                        <textarea name="about" className="form-control" id="editor" defaultValue={doctor.about || ''} required />
                                    </div>
                                </div>
                                <hr className='mt-4' />
                                <h3 className='text-capitalize'>Professional information</h3>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="speciality">Speciality</label>
                                        <select className="form-select" name="speciality" id="speciality">
                                            <option value={doctor.speciality}>{doctor.speciality}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="degree">Degree</label>
                                        <input type="text" name="degree" className="form-control" id="degree" defaultValue={doctor.degree || ''} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="experience">Experience</label>
                                        <input type="number" name="experience" className="form-control" id="experience" defaultValue={doctor.experience || ''} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="hospital">Hospital</label>
                                        <input type="text" name="hospital" className="form-control" id="hospital" defaultValue={doctor.hospital || ''} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fee">Fee</label>
                                        <input type="number" name="fee" className="form-control" id="fee" defaultValue={doctor.fee || ''} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" d-flex justify-content-between ">
                                        <div className="form-group">
                                            <label htmlFor="timings">Time From</label>
                                            <input type="time" name="timeFrom" className="form-control" id="timings" defaultValue={doctor.timeFrom || ''} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="timings">Time To</label>
                                            <input type="time" name="timeTo" className="form-control" id="timings" defaultValue={doctor.timeTo || ''} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn text-white w-100 mt-3" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Update Info'
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}
