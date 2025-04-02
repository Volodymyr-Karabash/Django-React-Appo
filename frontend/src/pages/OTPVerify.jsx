import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useOTP } from '../context/OTPProvider';
import { useDataPass } from '../context/DataPassProvider';
import { toast } from 'react-toastify'


export default function OTPVerify() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const otp = useOTP();
    const { data } = useDataPass();
    console.log(
        data.get('username'),
        data.get('email'),
        data.get('password'),
        data.get('phone'),
        data.get('gender'),
        data.get('profile'),
    )
    const handleInput = (e) => {
        if (e.target.value.length === 1) {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
                document.querySelector('button').disabled = false;
            }
        } else {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
                document.querySelector('button').disabled = true;
            }
        }
    };
    const handleVerify = async (e) => {
        e.preventDefault();

        // match otp 
        const form = e.target
        let userOtp = ''
        form.querySelectorAll('input').forEach(input => {
            userOtp += input.value
        })
        if (userOtp === otp) { // if otp match
            setLoading(true)
            try {
                const res = await fetch('http://localhost:3000/api/user/register', {
                    method: 'POST',                   
                    body: data,
                })
                const result = await res.json();
                if(res.ok){
                    setLoading(false)
                    toast.success(result.message)
                    navigate('/signin')
                }
                else{
                    setLoading(false)
                    toast.error(result.message)
                }
            } catch (error) {
                setLoading(false)
                toast.error(error.message)
            }
        } else {
            alert('OTP not match! Try again.',)
        }
    }
    return (
        <section className="min-vh-100 pt-4 " style={{ backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)' }}  >
            <div className="container mx-auto ">
                <div className="row  shadow" style={{ height: '35rem' }}>
                    <div className="col-lg-12 col-md-12 pb-2 text-center text-white rounded d-flex align-items-center justify-content-center flex-column " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                        <h1>OTP Verify</h1>
                        <p>Enter the OTP sent to your email</p>
                        <form onSubmit={handleVerify}>
                            <div className="mb-3 d-flex gap-2 w-25 mx-auto ">
                                {
                                    otp.split('').map((_, index) => (
                                        <input onChange={handleInput} key={index} type="number" className="form-control fw-bold fs-5 text-center" maxLength="1" required />
                                    ))
                                }

                                {/* <input onChange={handleInput} type="number" name='otp' className="form-control fw-bold fs-5 text-center" id="otp" maxlength="1" required/>
                                <input onChange={handleInput} type="number" name='otp' className="form-control fw-bold fs-5 text-center" id="otp" maxlength="1" required/>
                                <input onChange={handleInput} type="number" name='otp' className="form-control fw-bold fs-5 text-center" id="otp" maxlength="1" required/>
                                <input onChange={handleInput} type="number" name='otp' className="form-control fw-bold fs-5 text-center" id="otp4" maxlength="1" required/> */}
                            </div>
                            <button type="submit" className="btn border border-white text-white " disabled >
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Verify'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
