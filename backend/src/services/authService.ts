import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

const registerUser = async (
  email: string,
  password: string,
  role: string = "user"
): Promise<IUser> => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(String(user._id), user.role);

  return { user, token };
};

const getAllUsers = async (): Promise<{ users: IUser[] }> => {
  const users = await User.find().select("-password");

  if (!users) {
    throw new Error("Failed to get users");
  }

  return { users };
};

const getUser = async (email: string): Promise<{ user: IUser }> => {
  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("Failed to get user");
  }

  return { user };
};

const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export default {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  generateToken,
};
