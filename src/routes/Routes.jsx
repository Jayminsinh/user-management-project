import { Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register"
import UserList from "../pages/UserList"
import PageNotFound from "../pages/PageNotFound"
import ProtectedRoute from "./ProtectedRotue";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "users", element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        )
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
];

export default routes;
