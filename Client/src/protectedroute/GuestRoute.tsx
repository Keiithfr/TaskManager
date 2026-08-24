import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p style={{color:"black"}}>Loading...</p>;
    }

    return user
        ? <Navigate to="/dashboard" replace />
        : <Outlet />;
};

export default GuestRoute;