import { Navigate, Outlet } from "react-router-dom"
import PublicNavbar from "../PublicNavbar"

const PrivateLayout = () => {
    const auth = true;
    if (auth) {
        <Navigate to="/" />
    }
    return (
        <>
            <PublicNavbar />
            <Outlet />
        </>
    )
}

export default PrivateLayout
