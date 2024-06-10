import "./UserCard.css";

interface UserCard {
  email: string;
  role: string;
}

const UserCard = ({ email, role }: UserCard) => {
  return (
    <div className="user-card">
      <div>Email: {email}</div>
      <div>Role: {role}</div>
    </div>
  );
};

export default UserCard;
