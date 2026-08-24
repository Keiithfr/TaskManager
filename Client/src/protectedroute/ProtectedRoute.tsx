import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();



    if (loading) {
        return <p style={{ color: "black" }}>Loading...</p>
    }
    return user
        ? <Outlet />
        : <Navigate to="/login" replace />

};

export default ProtectedRoute;