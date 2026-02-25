import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isAuth = useSelector(state => state.users.isAuth);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute
