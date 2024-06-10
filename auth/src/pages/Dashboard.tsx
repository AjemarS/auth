import React, { useEffect, useState } from "react";
import authService from "./../services/authService";

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
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
