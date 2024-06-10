import React, { useEffect, useState } from "react";
import authService from "./../services/authService";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

interface IUser {
  _id: string;
  email: string;
  role: string;
}

const UserCenter: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await authService.getUser();

        setUser(user);
      } catch (error) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      {user && <UserCard email={user.email} role={user.role} />}
    </div>
  );
};

export default UserCenter;
