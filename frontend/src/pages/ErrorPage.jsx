import { Link, useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();
    // console.log(error);
    return (
        <div className='d-flex flex-column justify-content-center align-items-center  min-vh-100 '>
            <h1 className='text-capitalize '>Opps! Something went wrong </h1>
            <h2>{error.status} {error.statusText} </h2>
            {/* <p>{error.error.message}</p> */}
            {/* back */}
            <button onClick={() => {navigate(-1)}} className='btn text-white ' style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>Go back</button>
        </div>
    )
}
