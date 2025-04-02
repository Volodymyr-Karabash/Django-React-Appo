import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
const navigate = useNavigate();
const { token } = useParams();
    const handleResetPassword = async (e) => {
        e.preventDefault();
        // Check if the passwords match
        if (e.target.password.value !== e.target.confirmPassword.value) {
            return toast.error('Passwords do not match! Please try again.');
        }
        const response = await fetch(`http://localhost:3000/api/user/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: e.target.password.value,
            })
        })
        const data = await response.json();
        if (response.ok) {
            toast.success(data.message)
            navigate('/signin')
        } else {
            toast.error(data.message)
        }

    }
    return (
        <section className="min-vh-100 pt-4 " style={{ backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)' }}  >
            <div className="container mx-auto ">
                <div className="row  shadow" style={{ height: '35rem' }}>
                    <div className="col-lg-12 col-md-12 pb-2 text-center text-white rounded d-flex align-items-center justify-content-center flex-column " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                        <h1 className='text-capitalize '>Reset your password</h1>
                        <form onSubmit={handleResetPassword}>
                            <label htmlFor="password">Your New Password </label>
                            <input type="password" min={6} name='password' className="form-control mb-2" id="password" placeholder="Enter Your password" required />
                            <label htmlFor="confirmPassword">Confirm Password </label>
                            <input type="password" min={6} name='confirmPassword' className="form-control mb-2" id="confirmPassword" placeholder="Enter Your password" required />
                            <button type="submit" className="btn border border-white text-white w-100 " >Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
