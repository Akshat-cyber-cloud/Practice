import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Wraps protected pages — if not logged in, redirects to /login
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
