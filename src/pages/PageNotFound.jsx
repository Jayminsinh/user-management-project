import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-2">
                Oops! Page not found
            </p>

            <NavLink
                to="/register"
                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            >
                Go to Register
            </NavLink>
        </div>
    );
};

export default NotFoundPage;
