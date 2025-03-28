import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCookie } from '../utilis/getCookie';

export default function ApplyDoctor() {
    const [loading, setLoading] = useState(false);
    const userById = useSelector(state => state.userById.userById);
    // console.log(userById.image.url);
    const token = getCookie('token');
    const handleApplyDoctor = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        if (formData.get('timeFrom') === formData.get('timeTo')) {
            toast.error('Time from and time to cannot be same');
            return;
        }
        if (formData.get('timeFrom') > formData.get('timeTo')) {
            toast.error('Time from cannot be greater than time to');
            return;
        }

        // formData.append('userId', userId); // Append userId to form data
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/user/apply-doctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    userId: userById._id,
                    image: userById.image.url,
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    address: formData.get('address'),
                    about: formData.get('about'),
                    speciality: formData.get('speciality'),
                    degree: formData.get('degree'),
                    experience: formData.get('experience'),
                    hospital: formData.get('hospital'),
                    fee: formData.get('fee'),
                    timeFrom: formData.get('timeFrom'),
                    timeTo: formData.get('timeTo')
                }),
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                toast.success(data.message);
                form.reset();
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Server error:', error);
            toast.error('Server error');
        }
    };
    return (
        <section>
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Apply for Doctor</h2>
                        <p>Fill the form below to apply for doctor</p>
                        <hr />
                        <h3 className='text-capitalize'>Personal information</h3>

                        <form onSubmit={handleApplyDoctor} >
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' defaultValue={userById.username || ''} className="form-control" id="name" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' defaultValue={userById.email || ''} className="form-control" id="email" required />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" defaultValue={userById.phone || ''} className="form-control" id="phone" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" name="address" className="form-control" id="address" required />
                                    </div>
                                </div>
                                {/* say about yourself */}
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="about">Say about yourself</label>
                                        <textarea name="about" className="form-control" id="about" required />
                                    </div>
                                </div>
                                <hr className='mt-4' />
                                <h3 className='text-capitalize'>Professional information</h3>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="speciality">Speciality</label>
                                        <select className="form-select" name="speciality" id="speciality">
                                            <option value="dentist">Dentist</option>
                                            <option value="cardiologist">Cardiologist</option>
                                            <option value="neurologist">Neurologist</option>
                                            <option value="dermatologist">Dermatologist</option>
                                            <option value="ophthalmologist">Ophthalmologist</option>
                                            <option value="gynecologist">Gynecologist</option>
                                            <option value="orthopedic">Orthopedic</option>
                                            <option value="pediatrician">Pediatrician</option>
                                            <option value="psychiatrist">Psychiatrist</option>
                                            <option value="urologist">Urologist</option>
                                            <option value="endocrinologist">Endocrinologist</option>
                                            <option value="oncologist">Oncologist</option>
                                            <option value="gastroenterologist">Gastroenterologist</option>
                                            <option value="nephrologist">Nephrologist</option>
                                            <option value="pulmonologist">Pulmonologist</option>
                                            <option value="rheumatologist">Rheumatologist</option>
                                            <option value="allergist">Allergist</option>
                                            <option value="anesthesiologist">Anesthesiologist</option>
                                            <option value="radiologist">Radiologist</option>
                                            <option value="pathologist">Pathologist</option>
                                            <option value="physiatrist">Physiatrist</option>
                                            <option value="surgeon">Surgeon</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="degree">Degree</label>
                                        <input type="text" name="degree" className="form-control" id="degree" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="experience">Experience</label>
                                        <input type="number" name="experience" className="form-control" id="experience" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="hospital">Hospital</label>
                                        <input type="text" name="hospital" className="form-control" id="hospital" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fee">Fee</label>
                                        <input type="number" name="fee" className="form-control" id="fee" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" d-flex justify-content-between ">
                                        <div className="form-group">
                                            <label htmlFor="timings">Time From</label>
                                            <input type="time" name="timeFrom" className="form-control" id="timings" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="timings">Time To</label>
                                            <input type="time" name="timeTo" className="form-control" id="timings" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn text-white w-100 mt-3" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Apply'
                                }
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </section >
    )
}
