import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    // console.log(error);
    return (
        <div className='d-flex flex-column justify-content-center h-100 '>
            <h1>Opps!</h1>
            <h2>{error.status} {error.statusText} </h2>
            <p>{error.error.message}</p>
            {/* back */}
            <Link to={"/"} className='btn btn-primary'>Go back</Link>
        </div>
    )
}
