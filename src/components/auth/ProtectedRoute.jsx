import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/Odin-Book-frontend/" />;
};

export default ProtectedRoute;
