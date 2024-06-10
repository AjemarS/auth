import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </>
  );
};

export default Navbar;
