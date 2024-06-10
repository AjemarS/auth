import React, { useEffect, useState } from "react";
import authService from "./../services/authService";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

interface IUser {
  _id: string;
  email: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getAllUsers();
        setUsers(data.users);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
      <div className="page">
        {users.map((user) => (
          <UserCard key={user._id} email={user.email} role={user.role} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
