import { Navigate, Outlet } from "react-router-dom"
import PrivateNavbar from "../PrivateNavbar"
import { useAuth } from "../context/AuthContext";
import PrivateFooter from "../PrivateFooter";

const PrivateLayout = () => {
    const auth = useAuth();
    if (!auth) {
        return <Navigate to="login" />
    }
    return (
        <>
            <PrivateNavbar />
            <Outlet />
            <PrivateFooter />
        </>
    )
}

export default PrivateLayout
