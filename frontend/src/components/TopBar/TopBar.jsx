import { Link } from "react-router-dom";
import style from './TopBar.module.css'
import { getCookie } from "../../utilis/getCookie";



export default function TopBar() {
    let user = getCookie("token");
    return (
        <div className={`${style.topbar} d-flex justify-content-between px-3 `}>
            <div className="topbar-left d-flex justify-content-between ">
                <div className="topbar-left-item m-2">
                    <i className="bi bi-telephone"></i>
                    <a href="tel:123-456-7890" className="text-white text-decoration-none "> 123-456-7890 </a>
                </div>
                <div className="topbar-left-item m-2">
                    <i className="bi bi-envelope"></i>
                    <span>
                        <a href="mailto:admin@gmail.com" className="text-white text-decoration-none "> admin@gmail.com </a>

                    </span>

                </div>
            </div>
            <div className="topbar-right d-flex justify-content-between  ">
                <div className="topbar-right-item m-2">

                    <a href="https://www.facebook.com/AbdurRahim1996" className=" text-white  "><i className="bi bi-facebook"></i></a>
                </div>
                <div className="topbar-right-item m-2">

                    <a href="" className=" text-white  "><i className="bi bi-twitter"></i></a>
                </div>
                <div className="topbar-right-item m-2">

                    <a href="" className=" text-white  "><i className="bi bi-instagram"></i></a>
                </div>
                <div className="topbar-right-item m-2">
                    <a href="" className=" text-white  "><i className="bi bi-linkedin"></i></a>

                </div>
                {
                    user ? (
                        <div className="topbar-right-item m-2"> 
                            <Link to="/dashboard" className="text-white text-decoration-none">Profile</Link>
                        </div>
                    ) : (
                        <div className="topbar-right-item m-2">
                            <Link to="/signin" className="text-white text-decoration-none border rounded px-2 py-1">Sign In / Sign Up</Link>
                        </div>
                    )
                }
            </div>

        </div>
    )
}
