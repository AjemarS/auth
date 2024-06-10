import { Navigate, Outlet } from "react-router-dom";

const PrivateUserRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateUserRoute;
