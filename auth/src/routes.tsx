import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserCenter from "./pages/UserCenter";
import PrivateUserRoute from "./components/routes/PrivateUserRoute";
import PrivateAdminRoute from "./components/routes/PrivateAdminRoute";
import Dashboard from "./pages/Dashboard";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateUserRoute />}>
          <Route path="/user-center" element={<UserCenter />} />
        </Route>
        <Route path="/admin" element={<PrivateAdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-center" element={<UserCenter />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
