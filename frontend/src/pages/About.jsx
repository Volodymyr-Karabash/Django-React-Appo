import React from 'react'
import BookProcess from '../components/BookProcess'
import Breadcum from '../components/Breadcum'


export default function About() {
    return (
        <>
            <Breadcum title="About Us" />
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className="w-75 "
                                src="https://doctris-react-landing.vercel.app/static/media/about-2.4f696a42c208855604fb.png"
                                alt="" />
                        </div>
                        <div className="col-md-6 py-4">
                            <span className="badge rounded-pill " style={{ background: "#fd4169" }}>About Our Company</span>
                            <h2 className="fw-bold">We Are Always Ensure Best Medical Treatment For Your Health</h2>
                            <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                                Risus
                                commodo viverra maecenas accumsan lacus vel facilisis. </p>
                            <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                                Risus
                                commodo viverra maecenas accumsan lacus vel facilisis. </p>
                            <a href="" className="btn text-white" style={{ background: "#fd4169" }}>Read More</a>

                        </div>
                    </div>
                </div>
            </section>


            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 py-4">
                            <span className="badge rounded-pill " style={{ background: "#fd4169" }}>Our Mission</span>
                            <h2 className="fw-bold">Bring care to your home with one click</h2>
                            <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                                Risus
                                commodo viverra maecenas accumsan lacus vel facilisis. </p>
                            <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                                Risus
                                commodo viverra maecenas accumsan lacus vel facilisis. </p>
                            <a href="#" className="btn text-white" style={{ background: "#fd4169" }}>Read More</a>

                        </div>
                        <div className="col-md-6">
                            <img className="w-75 mx-auto mt-4"
                                src="https://demo.freaktemplate.com/bookappointment/public/front_pro/assets/images/resource/about-3.jpg"
                                alt="" />
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-5">
                <div className="container">
                    <h2 className="text-center ">Why Choose Us</h2>
                    <div className="row py-3">
                        <div className="col-md-4 ">
                            <div className="card  p-2">
                                <span className="why-choose-icon ">
                                    <img className=""
                                        src="https://doccure.dreamstechnologies.com/react/template/a7dc67b3b5051dfcedef.svg"
                                        alt="" />
                                </span>
                                <div className="card-body">
                                    <h5 className="card-title">Qualified Staff of Doctors</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                                        gravida.
                                        Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="card  p-2">
                                <span className="why-choose-icon ">
                                    <img className=""
                                        src="https://doccure.dreamstechnologies.com/react/template/a7dc67b3b5051dfcedef.svg"
                                        alt="" />
                                </span>
                                <div className="card-body">
                                    <h5 className="card-title">Qualified Staff of Doctors</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                                        gravida.
                                        Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="card  p-2">
                                <span className="why-choose-icon ">
                                    <img className=""
                                        src="https://doccure.dreamstechnologies.com/react/template/a7dc67b3b5051dfcedef.svg"
                                        alt="" />
                                </span>
                                <div className="card-body">
                                    <h5 className="card-title">Qualified Staff of Doctors</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                                        gravida.
                                        Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BookProcess />

            <section className="py-4">
                <div className="container">
                    <div className="text-center ">
                        <span className=" badge rounded-pill" style={{ background: "#fd4169" }}>Get Your Answer</span>
                        <h2 className="fw-bold display-5">Frequently Asked Questions</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img className="w-100 " src="https://doccure.dreamstechnologies.com/react/template/944b9f31701c81365de7.png" alt=""/>
                        </div>
                        <div className="col-md-6 py-5 ">

                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne" aria-expanded="false"
                                            aria-controls="flush-collapseOne">
                                            Can i make an Appointment Online with White Plains Hospital Kendi?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                            aria-controls="flush-collapseTwo">
                                            Can i make an Appointment Online with White Plains Hospital Kendi?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree" aria-expanded="false"
                                            aria-controls="flush-collapseThree">
                                            Can i make an Appointment Online with White Plains Hospital Kendi?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour" aria-expanded="false"
                                            aria-controls="flush-collapseFour">
                                            Can i make an Appointment Online with White Plains Hospital Kendi?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive" aria-expanded="false"
                                            aria-controls="flush-collapseFive">
                                            Can i make an Appointment Online with White Plains Hospital Kendi?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFive" className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
