import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

interface IFormInputs {
  email: string;
  password: string;
}

const SCHEMA = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SCHEMA),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const response = await authService.login(data.email, data.password);
      if (response.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response.token);

        if (response.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.role === "user") {
          navigate("/user-center");
        } else {
          throw new Error("Bad response role received");
        }
      } else {
        throw new Error("Token not received");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyUp={(e: React.KeyboardEvent) => {
        if (e.code === "Enter") handleSubmit(onSubmit);
      }}
    >
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        Want to register? <Link to="/register">Click here</Link>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
