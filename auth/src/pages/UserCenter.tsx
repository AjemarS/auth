import React, { useEffect, useState } from "react";
import authService from "./../services/authService";

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
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserCenter;
