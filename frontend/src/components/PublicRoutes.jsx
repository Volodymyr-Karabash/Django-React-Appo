import { Navigate } from 'react-router-dom';
import { getCookie } from '../utilis/getCookie';

export default function PublicRoutes({ children }) {
    let user = getCookie("token");
    return (
        <>
            {
                !user ? (
                    children
                ) : (
                    <Navigate to='/' />
                )
            }
        </>
    )
}
