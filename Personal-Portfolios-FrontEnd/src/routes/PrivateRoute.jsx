import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    // console.log(location.pathname);

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-svh flex justify-center items-center">
                <span className=" loading loading-ball loading-lg"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;