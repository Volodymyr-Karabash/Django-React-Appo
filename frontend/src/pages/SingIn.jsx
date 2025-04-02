import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setCookie } from '../utilis/getCookie';
import { useRef } from 'react';



export default function SingIn() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const handleSingIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value
                }),
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                toast(data.message);
                localStorage.setItem('user', JSON.stringify(data.user));
                // setCookie("token", data.user.Token, 30);
                navigate('/dashboard');
                // window.location.href = "/dashboard";
            } else {
                toast.error(data.message);
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const showPassword = (e) => {
        if (inputRef.current.type === 'password') {
            inputRef.current.type = 'text';
            e.target.classList.remove('bi-eye')
            e.target.classList.add('bi-eye-slash')
        } else {
            inputRef.current.type = 'password';
            e.target.classList.remove('bi-eye-slash')
            e.target.classList.add('bi-eye')
        }
    }
    return (
        <section className="min-vh-100 pt-5    " style={{ backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)' }}  >
            <div className="container mx-auto ">
                <div className="row  shadow" style={{ height: '33rem' }}>
                    <div className="col-lg-6 col-md-12 text-center text-white rounded-start d-flex align-items-center justify-content-center flex-column " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                        <h1>New Here</h1>
                        <p>Sign up and discover great amount of new opportunities! </p>
                        <Link to="/signup" className="btn border border-white text-white ">Sign Up</Link>
                    </div>
                    <div className="col-lg-6 col-md-12 bg-white rounded-end d-flex justify-content-center flex-column">
                        <h1>Sign In</h1>
                        <p>Sign in to your account</p>
                        <form onSubmit={handleSingIn}>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                {/* <input type="email" name='email' className="form-control" id="email" required /> */}
                                <input type="email" name='email' className="form-control" id="email" required />
                            </div>
                            <div className="form-group mb-3">
                                <div className="d-flex justify-content-between  ">
                                    <label htmlFor="password">Password</label>
                                    <Link to="/forgot-password" className='text-decoration-none'>Forgot Password?</Link>
                                </div>
                                <div className="position-relative">
                                    <i onClick={showPassword} className="bi bi-eye position-absolute p-2 end-0" style={{
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer'
                                    }}></i>
                                    <input type="password" ref={inputRef} name='password' className="form-control"  required />
                                </div>
                            </div>
                            {/* forgot password */}

                            <button type="submit" className="btn text-white  w-100" style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Sign In'
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}
