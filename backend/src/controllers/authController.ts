import { Request, Response } from "express";
import authService from "../services/authService";

interface RegisterUserRequest extends Request {
  body: {
    email: string;
    password: string;
    role?: string;
  };
}

interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const registerUser = async (req: RegisterUserRequest, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const user = await authService.registerUser(email, password, role);

    res.status(201).json({
      _id: String(user._id),
      email: user.email,
      role: user.role,
      token: authService.generateToken(String(user._id), user.role),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: LoginUserRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    if (!result || !result.user || !result.token) {
      throw new Error("Login failed, please try again");
    }

    const { user, token } = result;

    res.json({
      _id: String(user._id),
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.getUser(req.body.user.email);
    console.log(req);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
