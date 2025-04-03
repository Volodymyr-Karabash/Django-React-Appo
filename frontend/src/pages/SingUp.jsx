import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { generateCapture } from '../utilis/generateCapture'
import { useOTP } from '../context/OTPProvider';
import { useDataPass } from '../context/DataPassProvider';
import { toast } from 'react-toastify';

export default function SingUp() {
  const navigate = useNavigate();
  const otp = useOTP();
  const { setData } = useDataPass();
  const [loading, setLoading] = useState(false);
  const handleSingUp = async (e) => {
    e.preventDefault()
    const form = e.target
    // password verification
    if (form.password.value !== form.confirmPassword.value) {
      toast.error('Password and Confirm Password are not the match!')
      return
    }
    // capture verification
    if (form.capture.value !== form.captureVerify.value) {
      toast.error('Capture and Capture Verify are not the match!')
      return
    }
    // loading
    setLoading(true)
    // form data
    const formData = new FormData(form)
    // set data to context
    setData(formData)
    // send otp to email
    Email.send({
      SecureToken: import.meta.env.VITE_SECURE_TOKEN,
      To: form.email.value,
      From: import.meta.env.VITE_FROM_EMAIL,
      Subject: "OTP Verification",
      Body: `Your OTP is ${otp}`
    }).then(
      message => {
        // if message ok alert check your email 
        toast.success(`OTP Send to Your email : ${form.email.value}`)
      }
    );
    setLoading(false)
    navigate('/otpverify')
  }

  return (
    <section className="min-vh-100 pt-4 " style={{ backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)' }}  >
      <div className="container mx-auto ">
        <div className="row  shadow" style={{ height: '35rem' }}>
          <div className="col-lg-6 col-md-12 pb-2 text-center text-white rounded-start d-flex align-items-center justify-content-center flex-column " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
            <h1>Welcome</h1>
            <p>Sign in and discover great amount of new opportunities!</p>
            <Link to="/signin" className="btn border border-white text-white ">Sign In </Link>
          </div>
          <div className="col-lg-6 col-md-12 bg-white   rounded-end d-flex  justify-content-center  flex-column h-100">
            <h1>Create An Account</h1>
            <p>Sign up to your account</p>
            <form onSubmit={handleSingUp} >
              <div className="d-flex justify-content-between ">
                <div className="form-group mb-3">
                  <label htmlFor="username">Name</label>
                  <input type="text" name='username' className="form-control " id="username" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email' className="form-control" id="email" required />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' className="form-control" min='6' id="password" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" name='confirmPassword' className="form-control" id="confirmPassword" required />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group mb-3">
                  <label htmlFor="phone">Phone</label>
                  <input type="number" name='phone' className="form-control" id="phone" required />
                </div>
                {/* gender */}
                <div className="form-group mb-3">
                  <label htmlFor="gender">Gender </label>
                  <select className="form-select " name="gender" id="gender" required>
                    <option disabled>Select Your Gender  </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group mb-3">
                  <label htmlFor="capture">Capture</label>
                  <input type="text" defaultValue={generateCapture(6)} disabled name='capture' className="form-control border-0 fs-3 fw-bolder bg-transparent  " id="capture" style={{ fontFamily: "Special Elite, cursive" }} />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="captureVerify">Capture Verify</label>
                  <input type="text" name='captureVerify' className="form-control" id="captureVerify" placeholder="Enter your Captured" required />
                </div>
              </div>
              {/* Profile */}
              <div className="form-group mb-3">
                <label htmlFor="images">Profile</label>
                <input type="file" name='profile' className="form-control" id="images" required />
              </div>

              <button type="submit" className="btn w-100 text-white " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                {loading ? <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : 'Sign Up'}

              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
